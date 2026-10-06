import React, { useState } from "react";
import {
  BarChart3,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Info,
  Layers,
  HelpCircle,
} from "lucide-react";
import { BenfordAnalysisResult } from "../types";

interface BenfordAnalysisTabProps {
  benford: BenfordAnalysisResult;
}

export const BenfordAnalysisTab: React.FC<BenfordAnalysisTabProps> = ({
  benford,
}) => {
  const [selectedLaw, setSelectedLaw] = useState<"1BL" | "2BL">("1BL");
  const [showMathExplainer, setShowMathExplainer] = useState<boolean>(false);

  const stats = selectedLaw === "1BL" ? benford.firstDigitStats : benford.secondDigitStats;
  const isNonConforming = benford.madStatus === "NON_CONFORMING";

  return (
    <div className="space-y-6">
      {/* Top Banner with MAD & Chi-Square Score */}
      <div className={`border rounded-lg p-5 shadow-sm ${
        isNonConforming
          ? "bg-[#da363315] border-[#f85149]/50 text-[#f0f6fc]"
          : "bg-[#161b22] border-[#30363d] text-[#f0f6fc]"
      }`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#8b949e]">
                Forensic Numerical Audit (Benford's Law 1BL & 2BL - Mebane)
              </span>
              <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                isNonConforming
                  ? "bg-[#da363326] text-[#f85149] border-[#da3633]"
                  : "bg-[#21262d] text-[#3fb950] border-[#3fb950]/50"
              }`}>
                {isNonConforming ? "⚠️ ANOMALY DETECTED" : "✅ CONFORMING"}
              </span>
            </div>
            <h3 className="text-base font-bold text-[#f0f6fc]">{benford.benford}</h3>
            <p className="text-xs text-[#8b949e] font-sans">
              Analyzed <strong>{benford.totalNumbersAnalyzed} amounts and figures</strong> extracted from the PDF text stream.
            </p>
          </div>

          {/* Key Metrics */}
          <div className="flex items-center gap-4 text-xs font-mono">
            <div className="bg-[#0d1117] border border-[#30363d] p-2.5 rounded-md text-center min-w-[100px]">
              <span className="text-[#8b949e] text-[10px] block">MAD Score</span>
              <span className={`text-lg font-bold ${
                isNonConforming ? "text-[#f85149]" : "text-[#3fb950]"
              }`}>
                {benford.mad}
              </span>
              <span className="text-[9px] text-[#8b949e] block">{benford.madStatus}</span>
            </div>

            <div className="bg-[#0d1117] border border-[#30363d] p-2.5 rounded-md text-center min-w-[100px]">
              <span className="text-[#8b949e] text-[10px] block">Chi-Square (χ²)</span>
              <span className="text-lg font-bold text-[#58a6ff]">{benford.chiSquare}</span>
              <span className="text-[9px] text-[#8b949e] block">p-val: {benford.pValue}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-5 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <h3 className="text-sm font-bold font-mono text-[#f0f6fc] flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-[#58a6ff]" />
              <span>
                Frequency Distribution: {selectedLaw === "1BL" ? "First Digit (1BL)" : "Second Digit (2BL)"}
              </span>
            </h3>
            <p className="text-xs text-[#8b949e] mt-0.5">
              Comparison between document observed frequency vs expected Benford logarithmic curve.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedLaw("1BL")}
              className={`px-3 py-1.5 rounded-md text-xs font-mono transition-colors cursor-pointer ${
                selectedLaw === "1BL"
                  ? "bg-[#21262d] text-[#58a6ff] border border-[#388bfd66] font-bold"
                  : "bg-[#0d1117] text-[#8b949e] hover:text-[#f0f6fc] border border-[#30363d]"
              }`}
            >
              1BL (Digits 1-9)
            </button>
            <button
              onClick={() => setSelectedLaw("2BL")}
              className={`px-3 py-1.5 rounded-md text-xs font-mono transition-colors cursor-pointer ${
                selectedLaw === "2BL"
                  ? "bg-[#21262d] text-[#58a6ff] border border-[#388bfd66] font-bold"
                  : "bg-[#0d1117] text-[#8b949e] hover:text-[#f0f6fc] border border-[#30363d]"
              }`}
            >
              2BL (Digits 0-9)
            </button>
            <button
              onClick={() => setShowMathExplainer(!showMathExplainer)}
              className="p-1.5 rounded-md bg-[#0d1117] border border-[#30363d] text-[#8b949e] hover:text-[#f0f6fc] cursor-pointer"
              title="Benford mathematical explanation"
            >
              <HelpCircle className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Visual Bar Chart */}
        <div className="space-y-3.5 my-4">
          {stats.map((item) => {
            const maxFreq = 40;
            const actualWidth = Math.min(100, (item.actualFreq / maxFreq) * 100);
            const expectedWidth = Math.min(100, (item.expectedFreq / maxFreq) * 100);

            return (
              <div key={item.digit} className="space-y-1">
                <div className="flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded bg-[#0d1117] border border-[#30363d] flex items-center justify-center font-bold text-[#f0f6fc]">
                      {item.digit}
                    </span>
                    <span className="text-[#8b949e]">
                      Obs: <strong className="text-[#f0f6fc]">{item.actualFreq}%</strong> ({item.actualCount} times)
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-[#8b949e]">
                      Expected Benford: <strong className="text-[#58a6ff]">{item.expectedFreq}%</strong>
                    </span>
                    {item.isAnomaly && (
                      <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-[#da363326] text-[#f85149] border border-[#da3633]">
                        Z-Score: {item.zScore > 0 ? `+${item.zScore}` : item.zScore}
                      </span>
                    )}
                  </div>
                </div>

                {/* Dual bar: Actual vs Expected */}
                <div className="relative h-4 bg-[#0d1117] rounded-md overflow-hidden border border-[#30363d]">
                  {/* Expected line indicator */}
                  <div
                    className="absolute top-0 bottom-0 w-0.5 bg-[#58a6ff] z-10"
                    style={{ left: `${expectedWidth}%` }}
                    title={`Expected: ${item.expectedFreq}%`}
                  />

                  {/* Actual observed bar */}
                  <div
                    className={`h-full transition-all duration-500 rounded-sm ${
                      item.isAnomaly
                        ? "bg-[#f85149]"
                        : "bg-[#1f6feb]"
                    }`}
                    style={{ width: `${actualWidth}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center justify-between pt-3 border-t border-[#30363d] text-xs font-mono text-[#8b949e]">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-[#1f6feb]"></span>
              <span>Observed Frequency</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-0.5 bg-[#58a6ff]"></span>
              <span>Theoretical Benford Line P(d)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-[#f85149]"></span>
              <span>Statistical Anomaly (|Z| &gt; 2.5)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Suspicious Numbers Detected */}
      {benford.suspiciousNumbers.length > 0 && (
        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-5 shadow-sm">
          <h3 className="text-sm font-bold font-mono text-[#f0f6fc] flex items-center gap-2 mb-3">
            <AlertTriangle className="w-4 h-4 text-[#e3b341]" />
            <span>Suspicious Figures & Unnatural Patterns ({benford.suspiciousNumbers.length})</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {benford.suspiciousNumbers.map((num, idx) => (
              <div
                key={idx}
                className="bg-[#0d1117] border border-[#30363d] rounded-md p-3 text-xs font-mono"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-[#e3b341]">{num.rawText}</span>
                  <span className="text-[10px] text-[#8b949e]">Flag #{idx + 1}</span>
                </div>
                <p className="text-[#8b949e] mt-1 font-sans text-[11px]">{num.reason}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {showMathExplainer && (
        <div className="bg-[#0d1117] border border-[#388bfd66] rounded-lg p-5 text-xs text-[#c9d1d9] font-sans space-y-2.5 shadow-sm">
          <h4 className="font-bold font-mono text-[#58a6ff] text-sm">
            Forensic Rationale: Benford's Law in Numerical Auditing (Mebane 2BL)
          </h4>
          <p>
            <strong>Benford's Law (1BL)</strong> establishes that in unmanipulated natural numerical series (such as invoicing, inventory, affidavits, or accounting records), the probability that the leading significant digit is <em>d</em> is given by:
          </p>
          <pre className="bg-[#161b22] border border-[#30363d] p-2 rounded text-[#58a6ff] font-mono text-xs">
            P(d) = log10(1 + 1/d)   for d ∈ {'{1, ..., 9}'}
          </pre>
          <p>
            <strong>Mebane's Second-Digit Law (2BL)</strong> analyzes the second digit (0-9) with a smoother decreasing distribution. When synthetic scripts or tampering actors alter values in transmission, they generate anomalous spikes that raise the MAD (Mean Absolute Deviation) score above the critical threshold of 0.015 and push the p-value to zero (p &lt; 0.0001).
          </p>
        </div>
      )}
    </div>
  );
};
