import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Animated } from "react-native";

export const SkeletonCard = () => {
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    );
    animation.start();

    return () => animation.stop();
  }, [opacity]);

  return (
    <View style={styles.cardContainer}>
      {/* Skeleton Image */}
      <Animated.View style={[styles.skeletonImage, { opacity }]} />

      {/* Skeleton Details */}
      <View style={styles.cardDetails}>
        <View>
          {/* Header Row */}
          <View style={styles.headerRow}>
            <Animated.View style={[styles.skeletonCategory, { opacity }]} />
            <Animated.View style={[styles.skeletonRating, { opacity }]} />
          </View>

          {/* Title Lines */}
          <Animated.View style={[styles.skeletonTitleLine1, { opacity }]} />
          <Animated.View style={[styles.skeletonTitleLine2, { opacity }]} />
        </View>

        {/* Footer Row */}
        <View style={styles.cardFooter}>
          <Animated.View style={[styles.skeletonPrice, { opacity }]} />
          <Animated.View style={[styles.skeletonBadge, { opacity }]} />
        </View>
      </View>
    </View>
  );
};

export const ProductSkeletonList = () => {
  return (
    <View style={styles.listContainer}>
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </View>
  );
};

export default SkeletonCard;

const styles = StyleSheet.create({
  listContainer: {
    gap: 12,
    paddingBottom: 24,
  },
  cardContainer: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#F2F2F7",
  },
  skeletonImage: {
    width: 120,
    height: 120,
    borderRadius: 12,
    backgroundColor: "#E5E5EA",
  },
  cardDetails: {
    flex: 1,
    marginLeft: 16,
    justifyContent: "space-between",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  skeletonCategory: {
    width: 70,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#E5E5EA",
  },
  skeletonRating: {
    width: 40,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#E5E5EA",
  },
  skeletonTitleLine1: {
    width: "90%",
    height: 14,
    borderRadius: 6,
    backgroundColor: "#E5E5EA",
    marginBottom: 8,
  },
  skeletonTitleLine2: {
    width: "60%",
    height: 14,
    borderRadius: 6,
    backgroundColor: "#E5E5EA",
    marginBottom: 6,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginTop: 8,
  },
  skeletonPrice: {
    width: 80,
    height: 20,
    borderRadius: 6,
    backgroundColor: "#E5E5EA",
  },
  skeletonBadge: {
    width: 50,
    height: 18,
    borderRadius: 6,
    backgroundColor: "#E5E5EA",
  },
});
