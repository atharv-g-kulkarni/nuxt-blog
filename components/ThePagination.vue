<template>
  <div class="pf-v5-c-pagination pf-m-bottom">
    <button
      class="pf-v5-c-menu-toggle pf-m-plain pf-m-text pf-m-top"
      type="button"
      aria-expanded="false"
      id="pagination-menu-toggle-bottom-example"
    >
      <span class="pf-v5-c-menu-toggle__text">
        <b>1 - 10</b>&nbsp;of&nbsp;
        <b>36</b>
      </span>
      <span class="pf-v5-c-menu-toggle__controls">
        <span class="pf-v5-c-menu-toggle__toggle-icon">
          <i class="fas fa-caret-down" aria-hidden="true"></i>
        </span>
      </span>
    </button>
    <nav
      class="pf-v5-c-pagination__nav"
      aria-label="Pagination nav - bottom example"
    >
      <div class="pf-v5-c-pagination__nav-control pf-m-first">
        <button
          class="pf-v5-c-button pf-m-plain"
          type="button"
          disabled
          aria-label="Go to first page"
        >
          <i class="fas fa-angle-double-left" aria-hidden="true"></i>
        </button>
      </div>
      <div class="pf-v5-c-pagination__nav-control pf-m-prev">
        <button
          class="pf-v5-c-button pf-m-plain"
          type="button"
          disabled
          aria-label="Go to previous page"
        >
          <i class="fas fa-angle-left" aria-hidden="true"></i>
        </button>
      </div>
      <div class="pf-v5-c-pagination__nav-page-select">
        <span class="pf-v5-c-form-control">
          <input
            aria-label="Current page"
            type="number"
            min="1"
            max="4"
            value="1"
          />
        </span>
        <span aria-hidden="true">of 4</span>
      </div>
      <div class="pf-v5-c-pagination__nav-control pf-m-next">
        <button
          class="pf-v5-c-button pf-m-plain"
          type="button"
          aria-label="Go to next page"
        >
          <i class="fas fa-angle-right" aria-hidden="true"></i>
        </button>
      </div>
      <div class="pf-v5-c-pagination__nav-control pf-m-last">
        <button
          class="pf-v5-c-button pf-m-plain"
          type="button"
          aria-label="Go to last page"
        >
          <i class="fas fa-angle-double-right" aria-hidden="true"></i>
        </button>
      </div>
    </nav>
  </div>
</template>

<script setup>
const props = defineProps({
  totalCount: {
    type: Number,
    default: 10,
  },
});
</script>
