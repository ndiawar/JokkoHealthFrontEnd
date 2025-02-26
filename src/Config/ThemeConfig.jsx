export class ConfigDB {
  static data = {
    settings: {
      layout_type: 'ltr',  // Reste inchangé
      sidebar: {
        type: 'horizontal-wrapper enterprice-type', // Modification de "compact-wrapper" à "horizontal-wrapper enterprice-type"
        iconType: 'stroke-svg', // Pas de changement ici
      },
      sidebar_setting: null, // Changement de 'default-sidebar' à null
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
