export interface SeoProps {
  title?: string;
  description?: string;
}

export const defaultSeo: SeoProps = {
  title: "🌊 haisanquangninh - Hải sản tươi sống Quảng Ninh",
  description:
    "Hải sản tươi sống, nguồn gốc Quảng Ninh, giao hàng nhanh, chất lượng nhà hàng.",
};

export const buildTitle = (pageTitle?: string) =>
  pageTitle ? `${pageTitle} | 🌊 haisanquangninh` : defaultSeo.title;
