// Kiểm tra không cho nhập rỗng
function checkEmptyValue(value, idSpan) {
  // Xử lí dữ liệu value để kiểm tra xem có rỗng hay không
  var eleSpan = document.getElementById(idSpan);
  if (value == "") {
    document.getElementById(idSpan).style.display = "block";
    eleSpan.innerHTML = "Vui lòng không bỏ trống trường này";
    return false;
  } else {
    eleSpan.innerHTML = "";
    return true;
  }
}

// function check giới hạn ký tự cho tài khoản
function checkRange(value, idSpan) {
  var eleSpan = document.getElementById(idSpan);
  var str = value;
  var arr = str.split("");
  console.log(arr);
  if (arr.length >= 4 && arr.length <= 6) {
    eleSpan.innerHTML = "";
    return true;
  } else {
    document.getElementById(idSpan).style.display = "block";
    eleSpan.innerHTML = "Tối thiểu 4 ký tự và tối đa 6 ký tự";
    return false;
  }
}

// Kiểm tra phải là email
function checkEmailValue(value, idSpan) {
  const regexEmail =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  var isValid = regexEmail.test(value);
  console.log(isValid);
  if (isValid) {
    document.getElementById(idSpan).innerHTML = "";
    return true;
  } else {
    document.getElementById(idSpan).style.display = "block";
    document.getElementById(idSpan).innerHTML = "Email không đúng định dạng";
    return false;
  }
}

// function no digit number
function checkNoNumber(value, idSpan) {
  const regexNoNumber = /\b[^\d\W]+\b/g;
  var isValid = regexNoNumber.test(value);
  if (isValid) {
    document.getElementById(idSpan).innerHTML = "";
    return true;
  } else {
    document.getElementById(idSpan).style.display = "block";
    document.getElementById(idSpan).innerHTML =
      "Vui lòng chỉ nhập ký tự không kèm số";
    return false;
  }
}

// function password check
function checkPassword(value, idSpan) {
  const regexPassword =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{6,10}$/;
  var isValid = regexPassword.test(value);
  if (isValid) {
    document.getElementById(idSpan).innerHTML = "";
    return true;
  } else {
    document.getElementById(idSpan).style.display = "block";
    document.getElementById(idSpan).innerHTML =
      "Mật khẩu cần có độ dài từ 6-10 và ít nhất 1 số, 1 ký tự in hoa, 1 kí tự đặc biệt";
    return false;
  }
}

// Sử dụng && để nhận cả 2 trường giá trị
function checkMinMaxValue(value, idSpan, min, max) {
  var doDaiKyTu = value.length;
  if (doDaiKyTu >= min && doDaiKyTu <= max) {
    document.getElementById(idSpan).innerHTML = "";
    return true;
  } else {
    document.getElementById(idSpan).style.display = "block";
    document.getElementById(
      idSpan
    ).innerHTML = `Độ dài ký tự từ ${min} đến ${max}`;
    return false;
  }
}

// function incom range check
function checkIncome(value, idSpan, min, max) {
  var luong = value * 1;
  if (luong >= min && luong <= max) {
    document.getElementById(idSpan).innerHTML = "";
    return true;
  } else {
    document.getElementById(idSpan).style.display = "block";
    document.getElementById(
      idSpan
    ).innerHTML = `Vui lòng nhập giá trị từ ${min.toLocaleString({
      style: "currency",
      currency: "VND",
    })} VNĐ đến ${max.toLocaleString({
      style: "currency",
      currency: "VND",
    })}`;
    return false;
  }
}

function checkInputHour(value, idSpan, min, max) {
  var hour = value * 1;
  if (hour >= min && hour <= max) {
    document.getElementById(idSpan).innerHTML = "";
    return true;
  } else {
    document.getElementById(idSpan).style.display = "block";
    document.getElementById(
      idSpan
    ).innerHTML = `Vui lòng nhập giá trị từ ${min} đến ${max}`;
    return false;
  }
}
