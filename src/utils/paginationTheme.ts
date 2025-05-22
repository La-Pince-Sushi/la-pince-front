import { createTheme } from '@mui/material/styles';

/**
 * Thème personnalisé pour le composant de pagination Material UI
 * Utilise les couleurs du thème global de l'application
 */
export const paginationTheme = createTheme({
  palette: {
    primary: {
      main: '#603C3C', // Couleur cacao pour correspondre au thème
    },
  },
  components: {
    MuiPaginationItem: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            backgroundColor: '#FFE3AE', // Couleur beige pour les éléments sélectionnés
            color: '#603C3C', // Texte en couleur cacao
            fontWeight: 'bold',
            '&:hover': {
              backgroundColor: '#FFE3AE', // Même couleur au survol d'un élément sélectionné
            },
          },
          '&:hover': {
            backgroundColor: '#FFE3AE', // Même couleur au survol
          },
        },
      },
    },
  },
});