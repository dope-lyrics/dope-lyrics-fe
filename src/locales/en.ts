const en = {
  common: {
    loading: "Loading...",
    error: "Error:",
    backToHome: "Back to homepage",
    validation: {
      cantBeEmpty: "Can not be empty",
      notValid: "Enter a valid email.",
    },
    form: {
      select: {
        choose: "Please choose an option...",
      },
    },
  },
  homepage: {
    welcome: "Welcome to {name} {title}",
    description: "Share your favorite lyric with the world!",
    header: {
      logout: "Logout",
      login: "Login",
      add: "Add new lyric",
    },
    lyrics: {
      mood: "mood",
      addedBy: "added by",
    },
  },
  login: {
    welcomeBack: "Welcome back",
    enterDetails: "Fill out the inputs below",
    form: {
      username: "Username",
      password: "Password",
      email: "E-mail",
      login: "Login",
      validation: {
        username: "Username must contain at least 6 characters",
        password: "Password must contain at least 3 characters",
      },
    },
    dontHaveAccount: "Don't you have an account ?",
    register: "Register",
  },
  register: {
    enterDetails: "Fill out the inputs below",
    form: {
      reEnterPassword: "Re-enter your password",
      submit: "Register",
      validation: {
        dontMatch: "Passwords don't match",
      },
    },
    login: "Login",
    haveAccount: "Already have an account?",
  },
  add: {
    addLyrics: "Add Lyrics",
    description: "Share your favorite lyrics with the world!",
    form: {
      singer: "Singer",
      songName: "Song name",
      mood: "Mood",
      lyrics: "Lyrics",
      language: "Language",
      button: {
        save: "Save",
      },
      validation: {
        lyricMin: "Lyric must be at least 20 characters",
        lyricMax: "Lyric can be at most 144 characters.",
      },
    },
    message: {
      success: "Lyric has been added successfully!",
    },
  },
};

export { en };
