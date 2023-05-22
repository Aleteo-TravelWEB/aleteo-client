<template>
  <div id="footer">
    <nav>
      <a href="https://edu.ssafy.com" target="_blank">Ssafy</a> |
      <a href="https://github.com/Aleteo-TravelWEB" target="_blank">Github</a>
    </nav>
    <p>
      <span>저자 : SSU & KKU</span><br />
      <span>Copyright 2023. ALETEO. All Rights Reserved.</span>
      <br />
      <span></span>
      <br />
      <span></span>
    </p>
  </div>
</template>
<script>
export default {};
</script>
<style scoped>
#footer {
  width: 100%;
  height: 60px;
  border-top: 1px solid #c4c4c4;
  padding: 10px;
  color: #808080;
  font-size: 11px;
}

#footer a {
  display: inline-block;
  margin: 0 20px 10px 10px;
  color: #808080;
  font-size: 11px;
}

#footer a:visited {
  color: #808080;
}

#footer p {
  margin-top: 0;
  margin-bottom: 5px;
}

#footer p span {
  display: inline-block;
  margin-left: 20px;
}
</style>
