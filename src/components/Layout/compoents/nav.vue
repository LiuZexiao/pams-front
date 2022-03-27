<template>
  <el-header style=" --el-header-padding: 0 0;">
    <div class="top">
      <div class="center">
        <div class="info">
          <div class="header-div">
            <img class="header-logo"
                 src="../../../assets/dh1024.png"
                 alt="logo" />
            <span>
              <router-link to="/"> 党务系统</router-link>
            </span>
          </div>
          <div class="header-menu">
            <el-dropdown>
              <span class="el-dropdown-link">
                <a href="/owner/info"
                   target="_blank">
                  <el-avatar :size="50"
                             src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
                </a>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <a href="/owner/info"
                     target="_blank">
                    <el-dropdown-item>个人中心</el-dropdown-item>
                  </a>
                  <a href="/owner/account"
                     target="_blank">
                    <el-dropdown-item>账号中心</el-dropdown-item>
                  </a>
                  <el-dropdown-item divided>
                    <el-link :underline="false"
                             style="font-size: 10px;"
                             @click="loginout">
                      <switch-button width="17px"
                                     style="vertical-align: middle;" />
                      退出
                    </el-link>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </div>
      </div>
    </div>

  </el-header>
</template>

<script>
export default {
  name: "nav",
};
</script>

<style scoped>
body {
  margin: 0;
}
.header-div {
  top: 50%;
  left: 15%;
  position: absolute;
  transform: translate(-50%, -50%);

  color: #e9eef3;
  /* weight: 500; */
  font-size: 20px;
  /* position: absolute; */
}

.header-div img {
  vertical-align: middle;
  width: 45px;
  height: 45px;

  /*position: absolute; */

  /*  transform: translate(-50%, -50%); */
}

.header-menu {
  top: 50%;
  right: 2%;
  position: absolute;
  transform: translate(-50%, -50%);

  color: #e9eef3;
  /* weight: 500; */
  font-size: 10px;
  /* position: absolute; */

  display: flex;
}

.top {
  -webkit-text-size-adjust: 100%;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  font-size: 14px;
  line-height: 1.42857143;
  color: #333;
  font-weight: 400;
  font-family: Helvetica Neue, Helvetica, microsoft yahei, arial, STHeiTi,
    sans-serif;
  -webkit-box-direction: normal;
  margin: 0;
  padding: 0;
  -webkit-box-pack: center;
  -webkit-box-flex: 0;
  flex-grow: 0;
  flex-shrink: 0;
  z-index: 9999 !important;
  position: relative;
  box-sizing: border-box;
  display: flex;
  background: url(data:t1.png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAABKCAIAAAD16KlxAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDowQ0U3NkZFNzNDNjgxMUU3QThGQkM1MzhCMjNFNEI3OSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDowQ0U3NkZFODNDNjgxMUU3QThGQkM1MzhCMjNFNEI3OSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjBDRTc2RkU1M0M2ODExRTdBOEZCQzUzOEIyM0U0Qjc5IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjBDRTc2RkU2M0M2ODExRTdBOEZCQzUzOEIyM0U0Qjc5Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+QhWAHQAAAF9JREFUeNp0jssRgDAIRFlysA3H/iuyF7NGAklw9MDAso9POY9dRWQEScWiWyP5EXhppdf1m4/dKrA8+xheZpG1Zf3l6Hsq5i1jUXymz5rf3uDCxR9x49GXcHgV2y3AAKmMNZ0pOvpWAAAAAElFTkSuQmCC)
    repeat-x;
  background-size: auto 100%;
  justify-content: space-around;
  -webkit-box-align: center;
  align-items: center;
}
.center {
  -webkit-text-size-adjust: 100%;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  font-size: 14px;
  line-height: 1.42857143;
  color: #333;
  font-weight: 400;
  font-family: Helvetica Neue, Helvetica, microsoft yahei, arial, STHeiTi,
    sans-serif;
  -webkit-box-direction: normal;
  margin: 0;
  padding: 0;
  display: block;
  float: left;
  box-sizing: border-box;
  width: 83.33333%;
}
.info {
  -webkit-text-size-adjust: 100%;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  font-size: 14px;
  line-height: 1.42857143;
  color: #333;
  font-weight: 400;
  font-family: Helvetica Neue, Helvetica, microsoft yahei, arial, STHeiTi,
    sans-serif;
  -webkit-box-direction: normal;
  box-sizing: border-box;
  padding: 0;
  /* width: 1240px; */
  height: 74px;
  margin: 0 auto;
}
</style>