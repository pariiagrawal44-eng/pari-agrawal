import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '../data/quizQuestions';
import { 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Award, 
  ArrowRight,
  ShieldCheck,
  Lightbulb
} from 'lucide-react';

export const QuizSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);

  const question = QUIZ_QUESTIONS[currentIndex];
  const userChoice = selectedAnswers[currentIndex];
  const isAnswered = userChoice !== undefined;

  const handleSelectOption = (optIdx: number) => {
    if (isAnswered) return;
    setSelectedAnswers((prev) => ({ ...prev, [currentIndex]: optIdx }));
    setShowExplanation(true);
  };

  const handleNext = () => {
    setShowExplanation(false);
    if (currentIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedAnswers({});
    setShowExplanation(false);
    setQuizFinished(false);
  };

  // Calculate score
  const correctCount = Object.entries(selectedAnswers).filter(
    ([qIdx, ansIdx]) => QUIZ_QUESTIONS[Number(qIdx)].correctIndex === ansIdx
  ).length;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Title */}
      <div className="border-b border-slate-200 pb-5 text-center sm:text-left">
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight flex items-center justify-center sm:justify-start gap-2">
          <span>GitHub Structure &amp; Safety Knowledge Quiz</span>
        </h1>
        <p className="text-sm text-slate-600 mt-1">
          Test your instincts on secret management, licensing, Git branches, and repository organization.
        </p>
      </div>

      {!quizFinished ? (
        <div className="bg-white border border-slate-200 rounded-lg shadow-xs overflow-hidden">
          {/* Progress Header */}
          <div className="p-4 sm:p-5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 font-mono">
              Question {currentIndex + 1} of {QUIZ_QUESTIONS.length}
            </span>
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-slate-600 font-medium">Score:</span>
              <span className="text-xs font-bold font-mono px-2 py-0.5 bg-slate-200 rounded text-slate-900">
                {correctCount} / {currentIndex + (isAnswered ? 1 : 0)}
              </span>
            </div>
          </div>

          <div className="p-5 sm:p-6 space-y-6">
            {/* Question Prompt */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-mono font-bold text-sm shrink-0 mt-0.5">
                Q{currentIndex + 1}
              </div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                {question.question}
              </h2>
            </div>

            {/* Answer Options */}
            <div className="space-y-2.5">
              {question.options.map((opt, optIdx) => {
                const isSelected = userChoice === optIdx;
                const isCorrect = question.correctIndex === optIdx;

                let btnStyle = 'border-slate-200 hover:border-slate-400 hover:bg-slate-50 text-slate-800';

                if (isAnswered) {
                  if (isCorrect) {
                    btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-medium';
                  } else if (isSelected) {
                    btnStyle = 'border-rose-400 bg-rose-50 text-rose-950';
                  } else {
                    btnStyle = 'border-slate-200 text-slate-400 opacity-60';
                  }
                }

                return (
                  <button
                    key={optIdx}
                    disabled={isAnswered}
                    onClick={() => handleSelectOption(optIdx)}
                    className={`w-full text-left p-3.5 rounded-lg border text-xs sm:text-sm transition-all flex items-start gap-3 ${btnStyle}`}
                  >
                    <span className="w-6 h-6 rounded border border-slate-300 bg-white flex items-center justify-center text-xs font-mono font-semibold shrink-0 mt-0.5">
                      {String.fromCharCode(65 + optIdx)}
                    </span>
                    <span className="flex-1 leading-relaxed">{opt}</span>
                    {isAnswered && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />}
                    {isAnswered && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />}
                  </button>
                );
              })}
            </div>

            {/* Explanation Drawer */}
            {isAnswered && (
              <div className="space-y-3 pt-2">
                <div className={`p-4 rounded-lg border ${
                  userChoice === question.correctIndex
                    ? 'border-emerald-200 bg-emerald-50/50'
                    : 'border-rose-200 bg-rose-50/50'
                }`}>
                  <div className="flex items-center gap-2 font-semibold text-xs mb-1.5">
                    {userChoice === question.correctIndex ? (
                      <span className="text-emerald-800 flex items-center gap-1 font-bold">
                        <CheckCircle2 className="w-4 h-4" /> Correct Answer!
                      </span>
                    ) : (
                      <span className="text-rose-800 flex items-center gap-1 font-bold">
                        <XCircle className="w-4 h-4" /> Not Quite Right
                      </span>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {question.explanation}
                  </p>
                </div>

                <div className="p-3 bg-amber-50/60 border border-amber-200 rounded-md text-xs text-amber-950 flex items-start gap-2">
                  <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <p className="font-medium">{question.ruleOfThumb}</p>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    onClick={handleNext}
                    className="flex items-center gap-1.5 px-5 py-2 text-xs font-semibold rounded-md bg-slate-900 text-white hover:bg-slate-800 shadow-2xs"
                  >
                    <span>{currentIndex < QUIZ_QUESTIONS.length - 1 ? 'Next Question' : 'View Final Results'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Results View */
        <div className="bg-white border border-slate-200 rounded-lg shadow-xs p-6 sm:p-8 text-center space-y-5">
          <div className="w-14 h-14 rounded-full bg-slate-900 text-white flex items-center justify-center mx-auto shadow-sm">
            <Award className="w-7 h-7" />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900">Quiz Completed!</h2>
            <p className="text-sm text-slate-600 mt-1">
              You scored <span className="font-bold text-slate-900">{correctCount}</span> out of {QUIZ_QUESTIONS.length}
            </p>
          </div>

          <div className="max-w-md mx-auto p-4 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm text-slate-700 text-left space-y-2">
            <div className="font-bold text-slate-900">Key Takeaways for Every Project:</div>
            <ul className="space-y-1 list-disc pl-4 text-xs text-slate-600">
              <li>Never commit secrets (`.env`) or dependencies (`node_modules`)</li>
              <li>Always choose an open-source license (like MIT)</li>
              <li>Commit lockfiles (`package-lock.json`) for reproducibility</li>
              <li>Use feature branches instead of pushing straight to main</li>
              <li>Place automation workflows inside `.github/workflows/`</li>
            </ul>
          </div>

          <button
            onClick={handleRestart}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold rounded-md bg-slate-900 text-white hover:bg-slate-800 shadow-2xs"
          >
            <RotateCcw className="w-4 h-4" /> Retake Quiz
          </button>
        </div>
      )}
    </div>
  );
};
