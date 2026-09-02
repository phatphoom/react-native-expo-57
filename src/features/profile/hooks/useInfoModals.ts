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
      title: "Privacy Policy",
      subtitle: "Privacy Policy (Last updated August 2026)",
      sections: [
        {
          heading: "1. Personal Data Collection",
          body: "We collect information you provide during registration and profile updates, such as name, email, phone number, address, and profile photo to identify you and provide store management services effectively.",
        },
        {
          heading: "2. Purpose of Data Use",
          body: "Your information is used for authentication, access control management, essential account notifications, and improving app performance.",
        },
        {
          heading: "3. Data Security",
          body: "We implement international standard security measures including JWT token encryption and secure server storage.",
        },
        {
          heading: "4. Data Subject Rights",
          body: "You have the right to access, edit, or request account deletion at any time via the account settings menu in the app.",
        },
      ],
    });

  const openTermsOfService = () =>
    setInfoModal({
      visible: true,
      title: "Terms of Service",
      subtitle: "Terms & Conditions",
      sections: [
        {
          heading: "1. Acceptance of Terms",
          body: "By using this application, you agree to have read, understood, and accepted all terms and conditions specified herein.",
        },
        {
          heading: "2. User Account Security",
          body: "You are responsible for maintaining the confidentiality of your credentials and all activities occurring under your account.",
        },
        {
          heading: "3. Usage Restrictions",
          body: "You must not perform any action that may cause system damage, infringe on rights of others, or upload illegal content into the system.",
        },
        {
          heading: "4. Service Termination",
          body: "We reserve the right to suspend or terminate services to users violating these terms without prior notice.",
        },
      ],
    });

  const openAboutApp = () =>
    setInfoModal({
      visible: true,
      title: "About Application",
      subtitle: "About Application & Version Info",
      sections: [
        {
          heading: "Version Info",
          body: "Current Version: v1.0.0 (Build 100)\nEnvironment: React Native Expo 57 / Web",
        },
        {
          heading: "About System",
          body: "Store & Inventory Management System application supporting product listing, category management, profile verification, and full RESTful API integration.",
        },
        {
          heading: "Copyright & Development",
          body: "© 2026 E-Commerce System. All Rights Reserved.",
        },
      ],
    });

  const openHelpSupport = () =>
    setInfoModal({
      visible: true,
      title: "Help & Support",
      subtitle: "Help & Support Center",
      sections: [
        {
          heading: "Contact Us",
          body: "If you encounter any issues or have questions, contact support at:\nEmail: support@ecommerce-app.com\nPhone: +66 2 123 4567 (Mon-Fri 09:00 - 18:00)",
        },
        {
          heading: "Frequently Asked Questions (FAQ)",
          body: "• Forgot password: Contact administrator to reset your password\n• Change profile picture: Tap on profile avatar and select your photo\n• Edit product: Sign in with Administrator role",
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
