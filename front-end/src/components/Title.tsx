import { Typography, Box } from '@mui/material';

const Title = () => {
  return (
    <Box 
      sx={{
        textAlign: 'center', 
        mt: 2, 
        mb: 4,
      }}
    >
      <Typography
        variant="h3"
        component="h1"
        sx={{
          fontWeight: 'bold',
          color: 'primary.main',
          textTransform: 'uppercase',
          letterSpacing: 2,
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
        }}
      >
        Gestion des Produits
      </Typography>
    </Box>
  );
};

export default Title;
