const tr = {
  common: {
    loading: "Yükleniyor...",
    error: "Hata:",
    backToHome: "Anasayfaya dön",
    validation: {
      cantBeEmpty: "Bu alan boş olamaz!",
      notValid: "Geçerli bir email adresi giriniz.",
    },
    form: {
      select: {
        choose: "Seçiniz...",
      },
    },
    close: "Kapat",
  },
  homepage: {
    welcome: "{name} ' e hoş geldin {title} ",
    description: "Favori şarkı sözlerini dünya ile paylaş!",
    header: {
      logout: "Çıkış yap",
      login: "Giriş yap",
      add: "Şarkı sözü ekle",
    },
    lyrics: {
      mood: "mod",
      addedBy: "ekleyen",
    },
  },
  login: {
    welcomeBack: "Yeniden hoş geldin!",
    enterDetails: "Aşağıdan giriş yapabilirsin",
    form: {
      username: "Kullanıcı adı",
      password: "Şifre",
      email: "E-posta",
      login: "Giriş yap",
      validation: {
        username: "Kullanıcı adı en az 6 karakter içermelidir",
        password: "Şifre en az 3 karakter içermelidir",
      },
    },
    dontHaveAccount: "Hesabın yok mu?",
    register: "Üye ol",
  },
  register: {
    enterDetails: "Aşağıdaki alanları doldurup üye olabilirsin",
    form: {
      reEnterPassword: "Şifreyi yeniden girin",
      submit: "Üye ol",
      validation: {
        dontMatch: "Şifreler eşleşmiyor",
      },
    },
    login: "Giriş yap",
    haveAccount: "Daha önce üye olmuş muydunuz?",
    modal: {
      error: {
        title: "Hata oluştu",
      },
      success: {
        title: "Başarılı",
      },
    },
  },
  add: {
    addLyrics: "Şarkı sözü ekle",
    description: "En beğendiğin şarkı sözlerini dünya ile paylaş!",
    form: {
      singer: "Sanatçı",
      songName: "Şarkı adı",
      mood: "Ruh hali",
      lyrics: "Söz",
      language: "Dil",
      button: {
        save: "Kaydet",
      },
      validation: {
        lyricMin: "Şarkı sözü en az 20 karakter olmalıdır.",
        lyricMax: "Şarkı sözü en fazla 144 karakter olabilir.",
      },
    },
    message: {
      success: "Şarkı sözü başarıyla eklendi!",
    },
  },
};

export { tr };
