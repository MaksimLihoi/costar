// @flow

export type PurchasesPackageType = {
  identifier: string,
  offeringIdentifier: string,
  packageType:
    | 'ANNUAL'
    | 'ANNUAL2'
    | 'MONTHLY'
    | 'MONTHLY_TRIAL'
    | 'WEEKLY'
    | 'WEEKLY_TRIAL',
  product: PurchasesProductType,
};

export type PurchasesProductType = {
  identifier: string,
  description: string,
  title: string,
  price: number,
  price_string: string,
  currency_code: string,
  intro_price: number | null,
  intro_price_string: string | null,
  intro_price_period: string | null,
  intro_price_cycles: number | null,
  intro_price_period_unit: string | null,
  intro_price_period_number_of_units: number | null,
};

export type PurchasesOffering = {
  identifier: string,
  serverDescription: string,
  availablePackages: [PurchasesPackageType],
  lifetime: PurchasesPackageType | null,
  annual: PurchasesPackageType | null,
  sixMonth: PurchasesPackageType | null,
  threeMonth: PurchasesPackageType | null,
  twoMonth: PurchasesPackageType | null,
  monthly: PurchasesPackageType | null,
  weekly: PurchasesPackageType | null,
};
