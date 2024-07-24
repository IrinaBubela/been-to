export interface Country {
  id: string;
  visited: boolean;
}

export interface CountryState {
  countries: Country[];
}

export interface AppState {
  countryState: CountryState;
}