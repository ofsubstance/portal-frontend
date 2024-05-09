import { Grid, Tab, Tabs, Typography } from "@mui/material";

import RecommendationItem from "./RecommendationItem";

export default function Recommendation() {
  return (
    <div className="space-y-1">
      <div className="flex gap-5 items-center md:flex-row flex-col">
        <Typography variant="h6" fontWeight={600}>
          Our Collection
        </Typography>

        <Tabs
          value="1"
          onChange={() => {}}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
          sx={{
            ml: {
              lg: "auto",
            },
          }}
        >
          <Tab value="1" label="Latest" />
          <Tab value="2" label="Popular" />
        </Tabs>
      </div>

      <Grid
        container
        rowSpacing={5}
        columnSpacing={3}
        columns={{ md: 2, lg: 3, xs: 1 }}
      >
        {Array.from(Array(9)).map((_, index) => (
          <Grid item xs={1} key={index}>
            <RecommendationItem />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
