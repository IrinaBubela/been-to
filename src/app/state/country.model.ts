export interface CountryState {
    selectedCountry: {
      name: string;
      login: string;
      password: string;
    } | null;
  }