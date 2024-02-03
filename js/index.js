var arrNhanVien = [];
getLocalStorage("arrNhanVien");
function addNhanVien() {
  var arrInput = document.querySelectorAll(
    ".modal-body input, .modal-body select"
  );
  console.log(arrInput);
  var nhanVien = new NhanVien();
  for (var i = 0; i < arrInput.length; i++) {
    console.log(arrInput[i].value);
    var id = arrInput[i].id;
    nhanVien[id] = arrInput[i].value;
  }
  // return nhanVien;
  // flag
  var isValid = true;
  // tài khoản
  console.log(nhanVien.tknv);
  isValid &= checkEmptyValue(nhanVien.tknv, "tbTKNV");
  isValid &= checkRange(nhanVien.tknv, "tbTKNV");
  console.log(isValid);

  // tên
  isValid &= checkEmptyValue(nhanVien.name, "tbTen");
  isValid &= checkNoNumber(nhanVien.name, "tbTen");

  // email
  isValid &= checkEmptyValue(nhanVien.email, "tbEmail");
  isValid &= checkEmailValue(nhanVien.email, "tbEmail");

  // password
  isValid &= checkEmptyValue(nhanVien.password, "tbMatKhau");
  isValid &= checkPassword(nhanVien.password, "tbMatKhau");

  // date
  isValid &= checkEmptyValue(nhanVien.datepicker, "tbNgay");

  // income
  isValid &= checkEmptyValue(nhanVien.luongCB, "tbLuongCB");
  isValid &= checkIncome(nhanVien.luongCB, "tbLuongCB", 1000000, 20000000);

  // role
  isValid &= checkEmptyValue(nhanVien.chucvu, "tbChucVu");

  // hour
  isValid &= checkEmptyValue(nhanVien.gioLam, "tbGioLam");
  isValid &= checkInputHour(nhanVien.gioLam, "tbGioLam", 80, 200);

  if (isValid) {
    return nhanVien;
  }
}

// Employee adding
document.getElementById("btnThemNV").onclick = function () {
  console.log("huhu");
  var nhanVienMoi = addNhanVien();
  console.log(nhanVienMoi);
  if (nhanVienMoi) {
    arrNhanVien.push(nhanVienMoi);
    console.log(arrNhanVien);
    saveLocalStorage("arrNhanVien", arrNhanVien);
    renderNhanVien(arrNhanVien);
    document.getElementById("formInputTyping").reset();
  }
};

// Employee render
function renderNhanVien(arr) {
  if (!arr) {
    arr = arrNhanVien;
  }
  var content = "";
  for (var i = 0; i < arr.length; i++) {
    var nhanVien = arr[i];
    var newNhanVien = new NhanVien();
    Object.assign(newNhanVien, nhanVien);
    console.log(nhanVien);
    console.log(newNhanVien.tinhTongLuong());
    console.log(newNhanVien.datepicker);
    var initial = newNhanVien.datepicker.split("-");
    var date = [initial[1], initial[0], initial[2]].join("/");

    var stringHTML = `
        <tr>
            <td>${newNhanVien.tknv}</td>
            <td>${newNhanVien.name}</td>
            <td>${newNhanVien.email}</td>
            <td>${date}</td>
            <td>${newNhanVien.chucvu}</td>
            <td>${newNhanVien.tinhTongLuong()}</td>
            <td>${newNhanVien.xepLoai()}</td>
            <td>
                <button onclick="getInfoNhanVien('${
                  newNhanVien.tknv
                }')" class="btn btn-warning">Sửa</button>
                <button onclick="deleteNhanVien('${
                  newNhanVien.tknv
                }')" class="btn btn-danger">Xoá</button>
            </td>
        </tr>
        `;
    content += stringHTML;
  }
  //   return content
  document.getElementById("tableDanhSach").innerHTML = content;
}

// function save info
function saveLocalStorage(key, value) {
  var stringJson = JSON.stringify(value);
  localStorage.setItem(key, stringJson);
}

// function get info
function getLocalStorage(key) {
  var dataLocal = localStorage.getItem(key);
  // Kiểm tra dữ liệu xem có hay không,
  if (dataLocal) {
    // Chuyển đổi chuỗi JSON về lại array hoặc object
    var newData = JSON.parse(dataLocal);
    arrNhanVien = newData;
    renderNhanVien(arrNhanVien);
  }
}

// function delete nhan viên
function deleteNhanVien(tknv) {
  for (var index = 0; index < arrNhanVien.length; index++) {
    if (tknv == arrNhanVien[index].tknv) {
      console.log(index);
      arrNhanVien.splice(index, 1);
    }
  }
  renderNhanVien(arrNhanVien);
  saveLocalStorage("arrNhanVien", arrNhanVien);
  console.log(tknv);
}

function getInfoNhanVien(tknv) {
  var modal = new bootstrap.Modal(document.getElementById("myModal"));
  modal.show();
  console.log(tknv);
  var NhanVien;
  for (var index = 0; index < arrNhanVien.length; index++) {
    if (tknv == arrNhanVien[index].tknv) {
      NhanVien = arrNhanVien[index];
    }
  }
  console.log(NhanVien);
  var arrInput = document.querySelectorAll(
    ".modal-body input, .modal-body select"
  );
  console.log(arrInput);
  for (var z = 0; z < arrInput.length; z++) {
    console.log(arrInput[z]);
    var id = arrInput[z].id;
    arrInput[z].value = NhanVien[id];
  }
  // Khi đưa dữ liệu lên, tìm cách để cho input tài khoản người dùng không thể chỉnh sửa được
  document.getElementById("tknv").readOnly = true;
}

function updateNhanVien() {
  console.log("huhu");
  // Đi lấy dữ liệu của NV sau khi người dùng chỉnh sửa trên input
  var nhanVien = addNhanVien();
  if (nhanVien) {
    console.log(nhanVien);
    // Lấy mssv của NV đang được chỉnh sửa và thực hiện tìm vị trí của SV đó trong mảng
    for (var i = 0; i < arrNhanVien.length; i++) {
      var nhanVienTrongMang = arrNhanVien[i];
      if (nhanVien.tknv == nhanVienTrongMang.tknv) {
        arrNhanVien[i] = nhanVien;
      }
    }
    console.log(arrNhanVien);
    renderNhanVien(arrNhanVien);
    saveLocalStorage("arrNhanVien", arrNhanVien);
    document.getElementById("tknv").readOnly = false;
    document.getElementById("formInputTyping").reset();
  }
}
document.getElementById("btnCapNhat").onclick = function () {
  updateNhanVien();
};

// function search nhân viên
function searchNhanVien(event) {
  console.log(event.target);
  var valueUser = event.target.value;
  var keyword = valueUser.trim().toLowerCase();
  var newKeyword = removeVietnameseTones(keyword);
  console.log(keyword);
  console.log(newKeyword);
  var arrNhanVienFilter = [];

  // Duyệt qua từng nhân viên trong mảng và kiểm tra với keyword người dùng
  for (var i = 0; i < arrNhanVien.length; i++) {
    var nhanVien = arrNhanVien[i];
    var newNhanVien = new NhanVien();
    Object.assign(newNhanVien, nhanVien);
    // Cũng loại bỏ dấu tiếng việt, khoảng trắng 2 đầu và chuyển về chữ thường
    var newTenNV = removeVietnameseTones(
      newNhanVien.xepLoai().trim().toLowerCase()
    );

    // includes() sẽ có 2 trường hợp xảy ra true nếu keyword có trong chuỗi và false nếu không có
    if (newTenNV.includes(newKeyword)) {
      arrNhanVienFilter.push(nhanVien);
    }
  }
  renderNhanVien(arrNhanVienFilter);
  console.log(arrNhanVienFilter);
}
// Hàm bỏ dấu tiếng việt
function removeVietnameseTones(str) {
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
  str = str.replace(/Đ/g, "D");
  // Some system encode vietnamese combining accent as individual utf-8 characters
  // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
  str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
  // Remove extra spaces
  // Bỏ các khoảng trắng liền nhau
  str = str.replace(/ + /g, " ");
  str = str.trim();
  // Remove punctuations
  // Bỏ dấu câu, kí tự đặc biệt
  str = str.replace(
    /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
    " "
  );
  return str;
}

document.getElementById("btnTimNV").onclick = searchNhanVien;
