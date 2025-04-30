export class ConfigDB {
  static data = {
    settings: {
      layout_type: 'ltr',
      sidebar: {
      type: 'horizontal-wrapper enterprice-type',
      iconType: 'stroke-svg',
      },
      sidebar_setting: '', 
      },
    color: {
      primary_color: '#3E7E8C', // Valeur fixe (tu as retiré la logique de localStorage)
      secondary_color: '#1D6372', // Idem
      mix_background_layout: 'light-only', // Pas de changement ici
    },
    router_animation: 'fadeIn', // Pas de changement
  };
}
export default ConfigDB;
