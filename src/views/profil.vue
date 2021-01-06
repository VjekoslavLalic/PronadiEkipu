<template>
  <div class="container my-4">
    <!--Grid column-->
    <div class="col-md-6 mb-4">
      <form class="md-form">
        <div class="file-field">
          <div class="mb-4">
            <img
              src="https://mdbootstrap.com/img/Photos/Others/placeholder-avatar.jpg"
              class="rounded-circle z-depth-1-half avatar-pic"
              alt="example placeholder avatar"
            />
          </div>
          <div class="d-flex justify-content-center">
            <div class="btn btn-mdb-color btn-rounded float-left">
              <input type="file" />
            </div>
          </div>
        </div>
      </form>
    </div>
    <!-- editable input -->
  </div>
</template>


<script>
export default {
  name: "profil",
  data() {
    return {};
  },
};
// ZA PROFIL
</script>
<!-- some CSS styling changes and overrides -->
<style>
.kv-avatar .krajee-default.file-preview-frame,
.kv-avatar .krajee-default.file-preview-frame:hover {
  margin: 0;
  padding: 0;
  border: none;
  box-shadow: none;
  text-align: center;
}
.kv-avatar {
  display: inline-block;
}
.kv-avatar .file-input {
  display: table-cell;
  width: 213px;
}
.kv-reqd {
  color: red;
  font-family: monospace;
  font-weight: normal;
}
</style>