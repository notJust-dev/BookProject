import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import React from "react";
import { useMyBooks } from "../context/MyBooksProvider";
import Colors from "../constants/Colors";

type BookItemProps = {
  book: Book;
};

const BookItem = ({ book }: BookItemProps) => {
  const { isBookSaved, onToggleSaved } = useMyBooks();

  const saved = isBookSaved(book);

  return (
    <View style={styles.container}>
      <Image source={{ uri: book.image }} style={styles.image} />
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{book.title}</Text>
        <Text>by {book.authors?.join(", ")}</Text>

        <Pressable
          style={[styles.button, saved ? { backgroundColor: "lightgray" } : {}]}
          onPress={() => onToggleSaved(book)}
        >
          <Text style={styles.buttonText}>
            {saved ? "Remove" : "Want to Read"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginVertical: 10,
  },
  image: {
    flex: 1,
    aspectRatio: 2 / 3,
    marginRight: 10,
  },
  contentContainer: {
    flex: 4,
    borderColor: "lightgray",
    borderBottomWidth: 0.5,
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
  },
  button: {
    backgroundColor: Colors.light.tint,
    alignSelf: "flex-start",
    marginTop: "auto",
    marginVertical: 10,
    padding: 7,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
  },
});

export default BookItem;
