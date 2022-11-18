import { useState } from "react";
import { ActivityIndicator, FlatList, TextInput, Button } from "react-native";

import { Text, View } from "../../components/Themed";
import { useLazyQuery } from "@apollo/client";
import BookItem from "../../components/BookItem";
import { SafeAreaView } from "react-native-safe-area-context";
import { searchQuery } from "./queries";
import { parseBook } from "../../services/bookService";
import styles from "./styles";

export default function SearchScreen() {
  const [search, setSearch] = useState("");
  const [provider, setProvider] = useState<BookProvider>("googleBooksSearch");

  const [runQuery, { data, loading, error }] = useLazyQuery(searchQuery);

  return (
    <SafeAreaView edges={["top"]} style={styles.container}>
      <View style={styles.header}>
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Search..."
          style={styles.input}
        />
        <Button
          title="Search"
          onPress={() => runQuery({ variables: { q: search } })}
        />
      </View>

      <View style={styles.tabs}>
        <Text
          style={
            provider === "googleBooksSearch"
              ? { fontWeight: "bold", color: "royalblue" }
              : {}
          }
          onPress={() => setProvider("googleBooksSearch")}
        >
          Google Books
        </Text>
        <Text
          style={
            provider === "openLibrarySearch"
              ? { fontWeight: "bold", color: "royalblue" }
              : {}
          }
          onPress={() => setProvider("openLibrarySearch")}
        >
          Open Library
        </Text>
      </View>

      {loading && <ActivityIndicator />}
      {error && (
        <>
          <Text>Error fetching books</Text>
          <Text>{error.message}</Text>
        </>
      )}
      <FlatList
        data={
          (provider === "googleBooksSearch"
            ? data?.googleBooksSearch?.items
            : data?.openLibrarySearch?.docs) || []
        }
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <BookItem book={parseBook(item, provider)} />}
      />
    </SafeAreaView>
  );
}
