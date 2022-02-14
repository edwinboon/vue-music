<template>
  <li
    class="
      flex
      justify-between
      items-center
      p-3
      pl-6
      cursor-pointer
      transition
      duration-300
      hover:bg-gray-50
    "
  >
    <div>
      <a href="#" class="font-bold block text-gray-600">{{ song.modified_name }}</a>
      <span class="text-gray-500 text-sm">{{ song.name }}</span>
    </div>

    <div class="text-gray-600 text-lg">
      <span class="comments">
        <i class="fa fa-comments text-gray-600"></i>
        {{ song.comment_count }}
      </span>
    </div>
  </li>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Song } from '@/types/Song'

export default defineComponent({
  name: 'SongItem',
  props: {
    /**
     * Song
     */
    song: {
      required: true,
      type: Object as PropType<Song>
    }
  },
  setup() {
    return {}
  },
})
</script>
