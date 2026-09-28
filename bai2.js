// practice_gym_lockers.js

let isMemberValid = false;
let memberRank = "";
let memberCard = "";
let lockerZone = "";
let extraSupplies = "";
let totalSupplyFee = 0;
let deposit = 0;

do {
  console.log("\n" + "=".repeat(45));
  console.log("       GYM FITNESS - LOGISTICS");
  console.log("=".repeat(45));
  console.log("1. Tiếp nhận và xác thực thẻ hội viên");
  console.log("2. Ghi nhận vật tư mượn thêm");
  console.log("3. In phiếu bàn giao");
  console.log("4. Đóng ca và thoát");
  console.log("=".repeat(45));

  const choice = prompt("Nhập lựa chọn:");

  switch (choice) {
    // Chức năng 1: Xác thực thẻ
    case "1": {
      const rawCard = prompt("Nhập thẻ hội viên (VD: GYM-VIP-2026):");

      memberCard = rawCard.trim().toUpperCase();

      const isValidPrefix = memberCard.startsWith("GYM-");
      const isVip = memberCard.includes("VIP");
      const isStandard = memberCard.includes("STANDARD");

      if (isValidPrefix && (isVip || isStandard)) {
        isMemberValid = true;

        if (isVip) {
          memberRank = "VIP";
          lockerZone = "ZONE-A";
        } else {
          memberRank = "STANDARD";
          lockerZone = "ZONE-B";
        }

        console.log("Xác thực thẻ thành công!");
        console.log("Hạng hội viên:", memberRank);
        console.log("Khu tủ đồ:", lockerZone);
      } else {
        isMemberValid = false;
        console.log("Thẻ hội viên không hợp lệ!");
      }

      break;
    }

    // Chức năng 2: Ghi nhận vật tư
    case "2": {
      if (!isMemberValid) {
        console.log("Lỗi: Vui lòng xác thực thẻ trước!");
        break;
      }

      extraSupplies = prompt("Nhập vật tư (VD: TOWEL:2|LOCK:1):")
        .trim()
        .toUpperCase();

      totalSupplyFee = 0;
      deposit = 0;

      let remaining = extraSupplies;

      // Bóc tách từng vật tư bằng indexOf() và slice()
      while (remaining.length > 0) {
        const separatorIndex = remaining.indexOf("|");

        let item;

        if (separatorIndex === -1) {
          item = remaining;
          remaining = "";
        } else {
          item = remaining.slice(0, separatorIndex);
          remaining = remaining.slice(separatorIndex + 1);
        }

        const colonIndex = item.indexOf(":");

        if (colonIndex !== -1) {
          const itemCode = item.slice(0, colonIndex);
          const quantityText = item.slice(colonIndex + 1);
          const quantity = Number(quantityText);

          if (itemCode === "TOWEL" && quantity > 0) {
            totalSupplyFee += quantity * 20000;
            deposit += quantity * 50000;
          } else if (itemCode === "LOCK" && quantity > 0) {
            totalSupplyFee += quantity * 15000;
            deposit += quantity * 50000;
          }
        }
      }

      console.log("Đã ghi nhận vật tư.");
      console.log(
        "Phụ phí vật tư:",
        totalSupplyFee.toLocaleString("vi-VN"),
        "VNĐ",
      );

      console.log("Tiền đặt cọc:", deposit.toLocaleString("vi-VN"), "VNĐ");

      break;
    }

    // Chức năng 3: In phiếu
    case "3": {
      if (!isMemberValid) {
        console.log("Lỗi: Vui lòng xác thực thẻ trước!");
        break;
      }

      console.log("\n" + "=".repeat(45));
      console.log("       PHIẾU BÀN GIAO TỦ ĐỒ");
      console.log("=".repeat(45));

      console.log("Mã thẻ      :", memberCard);
      console.log("Hạng        :", memberRank);
      console.log("Khu tủ      :", lockerZone);

      if (memberRank === "VIP") {
        console.log("Khăn tắm    : 1 khăn lớn miễn phí");
      } else {
        console.log("Khăn tắm    : Vật tư mượn thêm tính phí");
      }

      console.log(
        "Phụ phí     :",
        totalSupplyFee.toLocaleString("vi-VN"),
        "VNĐ",
      );

      console.log("Đặt cọc     :", deposit.toLocaleString("vi-VN"), "VNĐ");

      console.log(
        "Tổng tạm thu:",
        (totalSupplyFee + deposit).toLocaleString("vi-VN"),
        "VNĐ",
      );

      console.log("Đặt cọc được hoàn lại khi trả vật tư.");

      console.log("=".repeat(45));

      break;
    }

    // Chức năng 4: Thoát
    case "4":
      console.log("Đã đóng ca làm việc.");
      break;

    default:
      console.log("Lựa chọn không hợp lệ!");
      break;
  }

  if (choice === "4") {
    break;
  }
} while (true);
