import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";

const API_KEY =
  "lalmanirhat::stepzen.net+1000::204fe77487127b04491414e08cc7ef94aae4dd7af37dd0bd9e0856ddfdbf4229";

const client = new ApolloClient({
  uri: "https://lalmanirhat.stepzen.net/api/nonexistent-camel/__graphql",
  headers: {
    Authorization: `Apikey ${API_KEY}`,
  },
  cache: new InMemoryCache(),
});

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <ApolloProvider client={client}>
          <Navigation colorScheme={colorScheme} />
        </ApolloProvider>
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
