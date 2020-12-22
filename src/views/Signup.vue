<template>
  <div class="reg">
    <h1>Registriraj se</h1>
    <div class="container">
      <div class="container">
        <div class="col-sm"></div>
        <div class="col-sm">
          <form class="form-pozicija">
            <div class="form-group">
              <div class="label1">
                <label for="exampleInputName">Ime</label>
              </div>
              <input
                type="text"
                class="form-control"
                id="exampleInputIme1"
                aria-describedby="emailHelp"
                placeholder=""
              />
            </div>

            <div class="form-group">
              <div class="label1">
                <label for="exampleInputName">Prezime</label>
              </div>
              <input
                type="text"
                class="form-control"
                id="exampleInputIme1"
                aria-describedby="emailHelp"
                placeholder=""
              />
            </div>

            <div class="form-group">
              <div class="label1">
                <label for="exampleInputName">Email</label>
              </div>
              <input
                type="email"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder=""
              />
            </div>
            <div class="form-group">
              <div class="label1">
                <label for="exampleInputName">Lozinka</label>
              </div>
              <input
                type="password"
                class="form-control"
                id="exampleInputPassword1"
                placeholder=""
              />
            </div>
            <div class="form-group">
              <div class="label1">
                <label for="exampleInputName">Opis</label>
              </div>
              <textarea
                type="text"
                class="form-control"
                id="exampleInputOpis1"
                aria-describedby="emailHelp"
                rows="5"
                cols="50"
              ></textarea>
            </div>

            <button type="submit" class="button">Registriraj se</button>
          </form>
        </div>
        <div class="col-sm"></div>
      </div>
    </div>
  </div>
</template>
