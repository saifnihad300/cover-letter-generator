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
} from "@mui/material";
import { styled } from "@mui/system";

const StyledContainer = styled(Box)(({ theme }) => ({
  maxWidth: "1200px",
  margin: "0 auto",
  padding: theme.spacing(3),
  display: "flex",
  justifyContent: "center",
}));

const InputSection = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  borderRadius: "12px",
  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
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
    <StyledContainer>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{ fontWeight: 700, color: "primary.main" }}
      >
        Cover Letter Generator
      </Typography>

      {step === "input" && (
        <InputSection>
          <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
            Enter your details
          </Typography>
          <Box display="flex" flexDirection="column" gap={4}>
            <JobDescriptionInput
              value={jobDescription}
              onChange={setJobDescription}
            />
            <ResumeInput value={resume} onChange={setResume} />
            <Box display="flex" justifyContent="flex-end">
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
          <CoverLetterOptions
            templates={templates}
            onSelect={handleSelectTemplate}
            loading={loading}
          />
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
          <FinalLetterDisplay content={finalLetter} />
        </InputSection>
      )}
    </StyledContainer>
  );
};
