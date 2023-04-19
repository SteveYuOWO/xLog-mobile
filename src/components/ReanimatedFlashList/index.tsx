import React from "react";
import type { ForwardedRef } from "react";
import { LayoutChangeEvent, StyleSheet, View } from "react-native";
import Animated from "react-native-reanimated";
import type {
  ILayoutAnimationBuilder,
  StyleProps,
} from "react-native-reanimated";
import { CellContainer, FlashList } from "@shopify/flash-list";
import type { FlashListProps } from "@shopify/flash-list";

const AnimatedFlashList = Animated.createAnimatedComponent(
  FlashList as any
) as any;
const AnimatedCellContainer = Animated.createAnimatedComponent(CellContainer);

interface AnimatedFlashListProps {
  onLayout: (event: LayoutChangeEvent) => void;
  // implicit `children` prop has been removed in @types/react^18.0.0
  children: React.ReactNode;
  inverted?: boolean;
  horizontal?: boolean;
}

const createCellRenderer = (
  itemLayoutAnimation?: ILayoutAnimationBuilder,
  cellStyle?: StyleProps
) => {
  const cellRenderer = ({ children, ...restProps }: AnimatedFlashListProps, ref: ForwardedRef<View>) => {
    return (
      <AnimatedCellContainer
        layout={itemLayoutAnimation}
        style={cellStyle}
        ref={ref}
        {...restProps}
      >
        {children}
      </AnimatedCellContainer>
    );
  };

  return React.forwardRef(cellRenderer);
};

export interface ReanimatedFlashListProps<ItemT> extends FlashListProps<ItemT> {
  itemLayoutAnimation?: ILayoutAnimationBuilder;
}

function AFlashList<T = any>(
  props: ReanimatedFlashListProps<T>,
  ref: ForwardedRef<FlashList<T>>
) {
  const { itemLayoutAnimation, ...restProps } = props;

  const cellStyle = restProps?.inverted
    ? restProps?.horizontal
      ? styles.horizontallyInverted
      : styles.verticallyInverted
    : undefined;

  const cellRenderer = React.useMemo(
    () => createCellRenderer(itemLayoutAnimation, cellStyle),
    [cellStyle]
  );

  return (
    <AnimatedFlashList
      ref={ref}
      {...restProps}
      CellRendererComponent={cellRenderer}
    />
  );
}

const styles = StyleSheet.create({
  verticallyInverted: { transform: [{ scaleY: -1 }] },
  horizontallyInverted: { transform: [{ scaleX: -1 }] },
});

export const ReanimatedFlashList = React.forwardRef(AFlashList) as <T>(
  props: ReanimatedFlashListProps<T> & {
    ref?: ForwardedRef<FlashList<T>>;
  }
) => ReturnType<typeof AFlashList>;
