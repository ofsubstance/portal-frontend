import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Divider,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";

import { RiArrowDownSLine as ExpandMoreIcon } from "react-icons/ri";
import VideoListItem from "@/components/videoItem/VideoListItem";
import { useState } from "react";

function SubmittedFeedbackSection() {
  const [expanded, setExpanded] = useState<number | false>(false);

  const handleChange =
    (panel: number) => (_: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <div className="flex flex-col gap-6">
      <Typography variant="h6" fontWeight={600}>
        Submitted Feedbacks
      </Typography>

      <Stack spacing={2} divider={<Divider />} flex={2}>
        {Array.from(Array(12)).map((_, index) => (
          <div key={index} className="space-y-2">
            <VideoListItem />

            <Accordion
              expanded={expanded === index}
              onChange={handleChange(index)}
              disableGutters
              sx={{
                "&::before": {
                  display: "none",
                },
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon size={24} />}
                sx={{
                  backgroundColor: "rgba(0, 0, 0, .03)",
                }}
              >
                <Typography
                  fontWeight={600}
                  sx={{ width: "33%", flexShrink: 0 }}
                >
                  Feedback
                </Typography>
                <Typography>Submitted on: October 10, 2021</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Nulla facilisi. Phasellus sollicitudin nulla et quam mattis
                  feugiat. Aliquam eget maximus est, id dignissim quam.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </div>
        ))}
      </Stack>

      <Pagination
        count={10}
        variant="outlined"
        shape="rounded"
        color="primary"
        sx={{
          display: "flex",
          justifyContent: "center",
          py: 2,
        }}
      />
    </div>
  );
}

export default SubmittedFeedbackSection;
