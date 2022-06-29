const StudentMain = () => {
    const navigate = useNavigate();
    return (
        // <div style = {{backgroundImage: `url(${background})`, backgroundSize: '100% 100%'}}>
        <div style = {{backgroundColor: '#FCF8E8', backgroundSize: '100% 100%'}}>
          <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
          <CssBaseline />
          <ContributorHeader />
          <Container disableGutters maxWidth="lg" component="main" sx={{ pt: 8, pb: 6 }}>
            <Typography
                component="h2"
                variant="h2"
                align="center"
                color="black"
                fontWeight='bolder'
                >
                Thanks For Contribution!
                </Typography>
          </Container>
          <Container maxWidth="md" component="main">
            {/* <Grid container spacing={5} alignItems="flex-end">
              {tiers.map((tier, index) => <ContributorHomeCard key={index} tier={tier} navigate={navigate} />)}
            </Grid> */}
            <Grid container spacing={5} alignItems="flex-end">
              <ContributorHomeButton url={setIcon} content={"Menage Your Recipes"} navigate={navigate} router={'/add_recipe'}/>
              <ContributorHomeButton url={addIcon} content={"Creat New Recipe"} navigate={navigate} router={'/add_recipe'}/>
            </Grid>
          </Container>
        
          <Container
            maxWidth="md"
            component="footer"
            sx={{
              mt: 8,
              py: [3, 6],
            }}
          >
          </Container>
        </div>
      );
}
export default StudentMain;