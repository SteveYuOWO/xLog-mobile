import type { FC } from "react";
import React, { useMemo } from "react";
import type { ViewStyle } from "react-native";
import { StyleSheet } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";

import { useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import { Image } from "expo-image";
import removeMd from "remove-markdown";
import { Card, H5, H6, Paragraph, SizableText, Spacer, Text, XStack } from "tamagui";

import { Avatar } from "@/components/Avatar";
import { useDate } from "@/hooks/use-date";
import { i18n } from "@/i18n";
import type { RootStackParamList } from "@/navigation/types";
import { findCoverImage } from "@/utils/find-cover-image";

type NoteEntity = any;

export interface Props {
  note: NoteEntity
  style?: ViewStyle
}

export const FeedListItem: FC<Props> = (props) => {
  const { note } = props;
  const date = useDate();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const onPress = React.useCallback(() => {
    navigation.navigate(
      "PostDetails",
      {
        characterId: note.characterId,
        noteId: note.noteId,
      },
    );
  }, [note]);

  const coverImage = useMemo(() => {
    const imageUrls = findCoverImage(note.metadata.content.content);

    return {
      uri: imageUrls.length > 1 ? imageUrls : imageUrls[0],
      isSingle: imageUrls.length === 1,
      isMultiple: imageUrls.length > 1,
    } as {
      uri: string
      isSingle: true
      isMultiple: false
    } | {
      uri: string[]
      isSingle: false
      isMultiple: true
    };
  }, [note.metadata.content.content]);

  return (
    <TouchableOpacity style={props.style} activeOpacity={0.65} onPress={onPress}>
      <Card elevate size="$4" bordered>
        <Card.Header padded>
          <XStack alignItems="center" gap={"$2"} marginBottom={"$1"}>
            <Avatar uri={note?.character?.metadata?.content?.avatars?.[0]} />
            <XStack alignItems="center">
              <H6>{note.character?.metadata?.content?.name || note.character?.handle}</H6>
            </XStack>
          </XStack>

          {
            note.metadata.content.title && <H5 fontWeight={"700"} color="$color" marginBottom={"$1"} numberOfLines={1}>{String(note.metadata.content.title).replaceAll(" ", "")}</H5>
          }

          <XStack justifyContent={coverImage.isSingle ? "space-between" : "flex-start"}>
            {
              note.metadata?.content?.content && (
                <Paragraph
                  width={coverImage.isSingle ? "65%" : "100%"}
                  numberOfLines={coverImage.isSingle ? 5 : 3}
                  size={"$xs"}
                >
                  {removeMd(
                    String(note.metadata.content.content.slice(0, 100)).replace(/(\r\n|\n|\r)/gm, " "),
                  )}
                </Paragraph>
              )
            }
            {
              coverImage.isSingle && (
                <Card bordered borderRadius={8} width={105} height={105}>
                  <Image source={{ uri: coverImage.uri }} style={styles.singleImageWrapper} />
                </Card>
              )
            }
          </XStack>
          {
            coverImage.isMultiple && (
              <>
                <Spacer size={"$2"} />
                <ScrollView horizontal>
                  {
                    coverImage.uri.slice(0, 6).map((uri, index) => {
                      const priority = index <= 3 ? "high" : "low";

                      return (
                        <Card key={index} bordered marginRight={"$3"} borderRadius={8} width={120} height={120}>
                          <Image priority={priority} source={{ uri }} contentFit="cover" style={styles.multipleImageWrapper} />
                        </Card>
                      );
                    })
                  }
                </ScrollView>
              </>
            )
          }
          <XStack marginTop={"$2"} justifyContent="space-between">
            <Text numberOfLines={1} maxWidth={"70%"}>
              {
                !!note.metadata?.content?.tags?.filter(tag => tag !== "post" && tag !== "page").length && (
                  <SizableText size={"$xs"} numberOfLines={1} color="$colorSubtitle">
                    {note.metadata?.content?.tags
                      ?.filter(tag => tag !== "post" && tag !== "page")
                      .map((tag, index) => (
                        <Text key={tag + index} fontSize={12}>
                        #{tag} &nbsp;
                        </Text>
                      ))}
                  </SizableText>
                )
              }
            </Text>
            <SizableText size={"$xs"} numberOfLines={1} color="$colorSubtitle">
              {i18n.t("ago", {
                time: date.dayjs
                  .duration(
                    date.dayjs(note?.createdAt).diff(date.dayjs(), "minute"),
                    "minute",
                  )
                  .humanize(),
              })}
            </SizableText>
          </XStack>
        </Card.Header>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  singleImageWrapper: {
    flex: 1,
  },
  multipleImageWrapper: {
    flex: 1,
  },
});
