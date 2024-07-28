<template>
  <div>
    <div class="header-main-container">
      <div class="pf-v5-l-grid pf-m-gutter">
        <div class="pf-v5-l-grid__item pf-m-1-col">
          <NuxtLink to="/"><h1>FridayBlog</h1></NuxtLink>
        </div>
        <div class="pf-v5-l-grid__item pf-m-9-col">
          <input id="fname" placeholder="Search" type="text" />
        </div>
        <div class="pf-v5-l-grid__item pf-m-2-col">
          <div
            class="pf-v5-l-flex pf-m-justify-content-flex-end pf-m-align-items-center"
          >
            <div class="pf-v5-l-flex__item menu-item">
              <i class="fa fa-pencil-alt" />
              <p>Write</p>
            </div>
            <div class="pf-v5-l-flex__item menu-item">
              <i class="fa fa-bell" />
            </div>
            <div class="pf-v5-l-flex__item menu-item">
              <pf-avatar alt="Libbie Koscinski" size="md" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <slot />
  </div>
</template>

<script setup>
import "@patternfly/elements/pf-avatar/pf-avatar.js";
</script>

<style scoped>
.header-main-container {
  height: 70px;
  padding: 0px 40px;
  background-color: #fff;
  border-bottom: solid 1px #f2f2f2;
  display: flex;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 2;
}

.header-main-container h1 {
  font-family: "Playwrite AR", cursive;
  font-weight: 600;
  font-size: 30px;
  cursor: pointer;
  text-decoration: none;
  color: #000000;
}

.header-main-container input {
  margin: 3px 0px 0px 10px;
  padding-left: 15px;
  height: 40px;
  border: solid 1px #f2f2f2;
  background-color: #f2f2f2;
  border-radius: 20px;
  width: 30%;
}

.header-main-container i {
  font-size: 20px;
}

.menu-item {
  text-align: center;
}

.menu-item:hover {
  cursor: pointer;
}
</style>
