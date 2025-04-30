import { useState } from "react";
import {
  JobDescriptionInput,
  ResumeInput,
  CoverLetterOptions,
  FinalLetterDisplay,
} from "../components/index";
import { generateTemplates, finalizeLetter } from "../services/api";
import {
  Box,
  Button,
  CircularProgress,
  Typography,
  Paper,
  Container,
} from "@mui/material";
import { styled } from "@mui/system";
import { HeaderBar } from "../components/Headerbar"; 

const StyledContainer = styled(Container)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center", // Center horizontally
  justifyContent: "center", // Center vertically
  minHeight: "calc(100vh - 64px)", // Account for header height
  padding: theme.spacing(3),
  marginTop: "64px", // Space for fixed header
}));

const InputSection = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  borderRadius: "12px",
  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
  width: "100%", // Full width of container
  maxWidth: "800px", // Constrain maximum width
}));

const ActionButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1.5),
  fontSize: "1rem",
  fontWeight: 600,
  borderRadius: "8px",
  textTransform: "none",
  boxShadow: "none",
  "&:hover": {
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  },
}));

export const Home = () => {
  const [jobDescription, setJobDescription] = useState("");
  const [resume, setResume] = useState("");
  const [templates, setTemplates] = useState<string[]>([]);
  const [finalLetter, setFinalLetter] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<"input" | "templates" | "final">("input");

  const handleGenerate = async () => {
    if (!jobDescription || !resume) return;

    setLoading(true);
    try {
      const result = await generateTemplates({ jobDescription, resume });
      setTemplates(result.templates);
      setStep("templates");
    } catch (error) {
      console.error("Generation failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectTemplate = async (template: string) => {
    setLoading(true);
    try {
      const result = await finalizeLetter({ selectedTemplate: template });
      setFinalLetter(result.finalLetter);
      setStep("final");
    } catch (error) {
      console.error("Finalization failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setJobDescription("");
    setResume("");
    setTemplates([]);
    setFinalLetter("");
    setStep("input");
  };

  return (
    <>
    <HeaderBar/>
    <StyledContainer maxWidth='lg'>
      {step === "input" && (
        <InputSection>
          <Typography variant="h6" gutterBottom sx={{ mb: 3, textAlign: "center", fontWeight: 600}}>
            Enter your details
          </Typography>
          <Box 
              display="flex" 
              flexDirection="column" 
              gap={4}
              alignItems="center" // Center children horizontally
            >
            <Box sx={{width: "100%", maxWidth: "600px"}}>
            <JobDescriptionInput
              value={jobDescription}
              onChange={setJobDescription}
            />
          </Box>

            <Box sx={{ width: "100%", maxWidth: "600px" }}> {/* Constrain input width */}
                <ResumeInput value={resume} onChange={setResume} />
            </Box>

            <Box display="flex" justifyContent="center" width="100%">
              <ActionButton
                variant="contained"
                color="primary"
                onClick={handleGenerate}
                disabled={loading || !jobDescription || !resume}
                startIcon={
                  loading ? (
                    <CircularProgress size={20} color="inherit" />
                  ) : null
                }
                sx={{ width: { xs: "100%", sm: "auto" } }}
              >
                {loading ? "Generating..." : "Generate Cover Letters"}
              </ActionButton>
            </Box>
          </Box>
        </InputSection>
      )}

      {step === "templates" && (
        <InputSection>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={3}
          >
            <Typography variant="h6">Choose a template</Typography>
            <ActionButton variant="outlined" onClick={handleReset}>
              Start Over
            </ActionButton>
          </Box>
          <Box display="flex" justifyContent="center"> {/* Center templates */}
              <CoverLetterOptions
                templates={templates}
                onSelect={handleSelectTemplate}
                loading={loading}
              />
          </Box>
        </InputSection>
      )}

      {step === "final" && (
        <InputSection>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={3}
          >
            <Typography variant="h6">Your Custom Cover Letter</Typography>
            <ActionButton variant="outlined" onClick={handleReset}>
              Create Another
            </ActionButton>
          </Box>
          <Box display="flex" justifyContent="center"> {/* Center final letter */}
              <FinalLetterDisplay content={finalLetter} />
          </Box>
        </InputSection>
      )}
    </StyledContainer>
    </>
  );
};
