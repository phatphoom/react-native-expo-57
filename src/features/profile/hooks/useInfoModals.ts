import { useState } from "react";

export type InfoModalSection = { heading?: string; body: string };

export type InfoModalState = {
  visible: boolean;
  title: string;
  subtitle?: string;
  sections: InfoModalSection[];
};

const CLOSED_STATE: InfoModalState = {
  visible: false,
  title: "",
  subtitle: "",
  sections: [],
};

export function useInfoModals() {
  const [infoModal, setInfoModal] = useState<InfoModalState>(CLOSED_STATE);

  const closeInfoModal = () =>
    setInfoModal((prev) => ({ ...prev, visible: false }));

  const openPrivacyPolicy = () =>
    setInfoModal({
      visible: true,
      title: "นโยบายความเป็นส่วนตัว",
      subtitle: "Privacy Policy (อัปเดตล่าสุด สิงหาคม 2026)",
      sections: [
        {
          heading: "1. การเก็บรวบรวมข้อมูลส่วนบุคคล",
          body: "เราเก็บรวบรวมข้อมูลที่คุณระบุระหว่างการลงทะเบียนและแก้ไขข้อมูลส่วนตัว เช่น ชื่อ นามสกุล อีเมล เบอร์โทรศัพท์ วันเกิด ที่อยู่ และรูปภาพโปรไฟล์ เพื่อใช้ในการระบุตัวตนและให้บริการจัดการร้านค้าอย่างมีประสิทธิภาพ",
        },
        {
          heading: "2. วัตถุประสงค์การใช้ข้อมูล",
          body: "ข้อมูลของคุณจะถูกใช้เพื่อการเข้าสู่ระบบ การจัดการสิทธิ์การเข้าถึง การส่งการแจ้งเตือนสำคัญเกี่ยวกับบัญชี และการปรับปรุงประสิทธิภาพการทำงานของแอปพลิเคชัน",
        },
        {
          heading: "3. การรักษาความปลอดภัยของข้อมูล",
          body: "เราใช้มาตรการรักษาความปลอดภัยตามมาตรฐานสากล มีการเข้ารหัสโทเค็นยืนยันตัวตน (JWT) และจัดเก็บข้อมูลอย่างปลอดภัยบนเซิร์ฟเวอร์",
        },
        {
          heading: "4. สิทธิของเจ้าของข้อมูล",
          body: "คุณมีสิทธิ์เข้าถึง แก้ไข หรือขอลบบัญชีและข้อมูลส่วนบุคคลของคุณได้ตลอดเวลาผ่านเมนูการตั้งค่าบัญชีในแอปพลิเคชัน",
        },
      ],
    });

  const openTermsOfService = () =>
    setInfoModal({
      visible: true,
      title: "เงื่อนไขการใช้งาน",
      subtitle: "Terms of Service",
      sections: [
        {
          heading: "1. การยอมรับข้อกำหนด",
          body: "การเข้าใช้งานแอปพลิเคชันนี้ถือว่าคุณได้อ่าน เข้าใจ และตกลงที่จะปฏิบัติตามข้อกำหนดและเงื่อนไขการใช้งานทั้งหมดที่ระบุไว้นี้",
        },
        {
          heading: "2. บัญชีผู้ใช้และความปลอดภัย",
          body: "คุณมีหน้าที่รับผิดชอบในการรักษาความลับของชื่อผู้ใช้และรหัสผ่านของคุณ รวมถึงกิจกรรมทั้งหมดที่เกิดขึ้นภายใต้บัญชีของคุณ",
        },
        {
          heading: "3. ข้อห้ามในการใช้งาน",
          body: "ห้ามมิให้กระทำการใดๆ ที่อาจก่อให้เกิดความเสียหายต่อระบบ ละเมิดสิทธิ์ของผู้อื่น หรืออัปโหลดเนื้อหาที่ผิดกฎหมายเข้ามาในระบบ",
        },
        {
          heading: "4. การระงับการให้บริการ",
          body: "เราขอสงวนสิทธิ์ในการระงับหรือยกเลิกการให้บริการแก่ผู้ใช้งานที่ละเมิดข้อกำหนดและเงื่อนไขการใช้งานโดยไม่ต้องแจ้งให้ทราบล่วงหน้า",
        },
      ],
    });

  const openAboutApp = () =>
    setInfoModal({
      visible: true,
      title: "เกี่ยวกับแอปพลิเคชัน",
      subtitle: "About Application & Version Info",
      sections: [
        {
          heading: "ข้อมูลเวอร์ชัน (Version)",
          body: "เวอร์ชันปัจจุบัน: v1.0.0 (Build 100)\nสภาพแวดล้อม: React Native Expo 57 / Web",
        },
        {
          heading: "เกี่ยวกับระบบ",
          body: "แอปพลิเคชันสำหรับจัดการระบบร้านค้าและสินค้า (Store & Inventory Management System) รองรับการแสดงผลสินค้า จัดการหมวดหมู่ ตรวจสอบโปรไฟล์ และเชื่อมต่อ RESTful API เต็มรูปแบบ",
        },
        {
          heading: "ลิขสิทธิ์และการพัฒนา",
          body: "© 2026 E-Commerce System. All Rights Reserved.\nออกแบบและพัฒนาโดยทีมงานผู้เชี่ยวชาญ",
        },
      ],
    });

  const openHelpSupport = () =>
    setInfoModal({
      visible: true,
      title: "ศูนย์ช่วยเหลือ",
      subtitle: "Help & Support Center",
      sections: [
        {
          heading: "ติดต่อเรา",
          body: "หากคุณพบปัญหาในการใช้งานหรือมีข้อสงสัย สามารถติดต่อทีมงานสนับสนุนได้ที่:\nอีเมล: support@ecommerce-app.com\nเบอร์โทรศัพท์: 02-123-4567 (จันทร์-ศุกร์ 09:00 - 18:00 น.)",
        },
        {
          heading: "คำถามที่พบบ่อย (FAQ)",
          body: "• ลืมรหัสผ่าน: ติดต่อผู้ดูแลระบบเพื่อขอรีเซ็ตรหัสผ่าน\n• เปลี่ยนรูปโปรไฟล์: กดที่รูปโปรไฟล์ในหน้านี้แล้วเลือกรูปภาพที่ต้องการ\n• แก้ไขข้อมูลสินค้า: เข้าสู่ระบบด้วยสิทธิ์ผู้ดูแลระบบ (Admin)",
        },
      ],
    });

  return {
    infoModal,
    closeInfoModal,
    openPrivacyPolicy,
    openTermsOfService,
    openAboutApp,
    openHelpSupport,
  };
}
