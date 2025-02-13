import { setupStorage } from "@crossbell/react-account/storage-config";
import { setNeedSSR } from "@crossbell/react-account/ssr-config";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Make sure to call this function before using any react-account related functions.
setupStorage(AsyncStorage);
setNeedSSR(false);