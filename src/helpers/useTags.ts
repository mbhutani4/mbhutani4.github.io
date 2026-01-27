"use client";

import { useCallback, useState } from "react";
import { isContainTag } from "./tags";

export function useTags() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const toggleTag = useCallback((tag: string) => {
    setSelectedTags((previousTags) => {
      const newTags = isContainTag(previousTags, tag)
        ? previousTags.filter((t) => t.toLowerCase() !== tag.toLowerCase())
        : [...previousTags, tag];
      return newTags;
    });
  }, []);

  return { selectedTags, toggleTag };
}
