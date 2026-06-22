import { useState } from "react";
import FormField from "../components/FormField";
import Button from "../components/Button";

export default function Contact() {
  // controlled form state
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  // her input değişince ilgili alanı güncelle
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // doğrulama: hata nesnesi döndürür
  const validate = () => {
    const next = {};
    if (!form.name.trim()) {
      next.name = "Lütfen adını gir.";
    }
    // basit ama gerçek bir email kontrolü
    if (!form.email.trim()) {
      next.email = "Email gerekli.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = "Geçerli bir email gir (ör. ad@site.com).";
    }
    if (form.message.trim().length < 10) {
      next.message = "Mesaj en az 10 karakter olmalı.";
    }
    return next;
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // sayfanın yenilenmesini engelle
    const next = validate();
    setErrors(next);
    // hata yoksa "gönderildi" durumuna geç
    if (Object.keys(next).length === 0) {
      setSent(true);
      setForm({ name: "", email: "", message: "" });
    }
  };

  // başarı durumu (empty state / feedback — yönerge bölüm 7)
  if (sent) {
    return (
      <div className="contact-success">
        <p>✅ Mesajın alındı, teşekkürler!</p>
        <Button variant="ghost" onClick={() => setSent(false)}>
          Yeni mesaj yaz
        </Button>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <FormField
        label="Adın" name="name"
        value={form.name} onChange={handleChange} error={errors.name}
      />
      <FormField
        label="Email" name="email" type="email"
        value={form.email} onChange={handleChange} error={errors.email}
      />
      <FormField
        label="Mesajın" name="message" textarea
        value={form.message} onChange={handleChange} error={errors.message}
      />
      <Button type="submit">Gönder</Button>
    </form>
  );
}