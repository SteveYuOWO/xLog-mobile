import type { FC } from "react";
import { useMemo } from "react";
import type { NativeScrollEvent, NativeSyntheticEvent } from "react-native";
import { StyleSheet } from "react-native";
import type { useAnimatedScrollHandler } from "react-native-reanimated";

import type { NoteEntity } from "crossbell.js";
import * as Haptics from "expo-haptics";
import { Spinner, Stack, useWindowDimensions } from "tamagui";

import { useComposedScrollHandler } from "@/hooks/use-composed-scroll-handler";
import type { FeedType } from "@/models/home.model";
import { useGetFeed } from "@/queries/home";

import { FeedListItem } from "./FeedListItem";

import { ReanimatedFlashList } from "../ReanimatedFlashList";

export interface Props {
  onScroll?: ReturnType<typeof useAnimatedScrollHandler>
  onScrollEndDrag?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void
  type?: FeedType
  noteIds?: string[]
  /**
   * @default 7
   * */
  daysInterval?: number
}

export const FeedList: FC<Props> = (props) => {
  const { type, noteIds, daysInterval = 7 } = props;
  const onScrollHandler = useComposedScrollHandler([props.onScroll]);
  const { width, height } = useWindowDimensions();
  const feed = useGetFeed({
    type,
    limit: 10,
    characterId: undefined, // TODO
    noteIds,
    daysInterval,
  });

  const feedList = useMemo<NoteEntity[]>(() => {
    return feed.data?.pages?.reduce((acc, page) => [...acc, ...(page?.list || [])], []) ?? [];
  }, [feed.data]);

  if (feed.isLoading) {
    return (
      <Stack justifyContent="center" alignItems="center" flex={1}>
        <Spinner />
      </Stack>
    );
  }

  return (
    <Stack flex={1}>
      <ReanimatedFlashList<NoteEntity>
        data={feedList}
        keyExtractor={(post, index) => `${type}-${post.noteId}-${index}`}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item, index }) => (
          <FeedListItem key={index} note={item} style={styles.ItemContainer} />
        )}
        estimatedItemSize={238}
        bounces
        estimatedListSize={{
          height: height * 0.8,
          width,
        }}
        scrollEventThrottle={16}
        onScroll={onScrollHandler}
        showsVerticalScrollIndicator={false}
        onScrollEndDrag={props.onScrollEndDrag}
        onEndReachedThreshold={0.2}
        onEndReached={() => {
          if (
            feedList.length === 0
            || feed.isFetching
            || feed.isFetchingNextPage
            || feed.isFetchingPreviousPage
            || feed.hasNextPage === false
          )
            return;

          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          feed?.fetchNextPage?.();
        }}
        ListFooterComponent={() => {
          if (feed.isFetchingNextPage)
            return <Spinner />;

          return null;
        }}
      />
    </Stack>
  );
};

const styles = StyleSheet.create({
  ItemContainer: {
    marginBottom: 16,
  },
});
