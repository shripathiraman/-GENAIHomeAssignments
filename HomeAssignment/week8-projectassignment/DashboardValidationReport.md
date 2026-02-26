# Private Capital Dashboard – MVP Validation Report

**Dashboard:** Private Capital / Mutual Fund  
**Date:** [YYYY-MM-DD]  
**Prepared by:** [Analyst / QA]  
**Purpose:** Validate data quality, edge cases, PII masking, and compliance before user rollout.

---

## 1. KPI Data Quality Checks

| KPI | Source | Calculation Type | Missing Values | Outliers | Notes / Action Required |
|-----|--------|-----------------|----------------|----------|------------------------|
| Net New Capital Inflow | Excel/API | On-Demand | [Yes/No] | [Yes/No] | [e.g., Fill missing months with 0 or flag] |
| Fund Performance (IRR/CAGR) | Excel/API | Pre-Computed | [Yes/No] | [Yes/No] | [Verify IRR formula matches user spec] |
| NAV Trend | Excel/API | Pre-Computed | [Yes/No] | [Yes/No] | [Check historical depth 36 months] |
| Marketing ROI | Excel/API | Pre-Computed | [Yes/No] | [Yes/No] | [Verify ROI formula; cross-check campaigns] |
| Cost per Acquisition (CPA) | Excel/API | On-Demand | [Yes/No] | [Yes/No] | [Check if on-demand formula matches spec] |

---

## 2. Drill-Down Hierarchy Checks

| Level | Expected Values | Missing / Null | Notes |
|-------|----------------|----------------|-------|
| Fund | [List of Funds] | [Yes/No] | Ensure consistent naming |
| Share Class | [List per Fund] | [Yes/No] | Validate mapping to Fund |
| Geography | [List of Regions] | [Yes/No] | Ensure region codes match standard |
| Investor Segment | [List] | [Yes/No] | Validate against master list |

---

## 3. PII & Compliance Checks

| Field | Masked | Notes |
|-------|--------|-------|
| Investor Name | [Yes/No] | Must be tokenized / masked |
| Email | [Yes/No] | Must be masked |
| Phone | [Yes/No] | Must be masked |
| Internal ID | [Yes/No] | Masked in all API responses |
| Government ID | [Yes/No] | Masked / tokenized |
| Bank Details | [Yes/No] | Masked |

**Frameworks Verified:** GDPR, SOC 2, ISO 27001, Financial Regulatory, Internal Policy  

---

## 4. API & ETL Validation

| Check | Status | Notes / Action |
|-------|--------|----------------|
| API Connectivity | [Pass/Fail] | Validate rate limits & latency |
| ETL Execution | [Pass/Fail] | Ensure pre-computed metrics match spec |
| On-Demand Metrics | [Pass/Fail] | Correct calculation & caching |
| Missing / Hidden Excel Columns | [Pass/Fail] | Validate before ETL |
| Historical Depth | [Pass/Fail] | Minimum 36 months data |

---

## 5. Visualization & UX Validation

| KPI | Chart Type | Tooltip Complete | Drill-Down Function | Notes |
|-----|------------|----------------|------------------|-------|
| Net New Capital Inflow | Bar | [Yes/No] | [Single / Full] | Validate axes & labels |
| Fund Performance (IRR/CAGR) | Line | [Yes/No] | [Single / Full] | Cross-check CAGR formula |
| NAV Trend | Line | [Yes/No] | [Single / Full] | Check time granularity |
| Marketing ROI | Heatmap | [Yes/No] | [Single / Full] | Validate campaign mapping |
| Cost per Acquisition (CPA) | Bar | [Yes/No] | [Single / Full] | Check on-demand calculation |

---

## 6. Error Handling / Fallback Validation

| Scenario | Test Status | Notes |
|----------|-------------|-------|
| API Timeout | [Pass/Fail] | Fallback visual appears |
| Missing Light Metric | [Pass/Fail] | Placeholder displayed |
| Missing Heavy Metric | [Pass/Fail] | Critical alert logged |
| PII Exposure | [Pass/Fail] | All sensitive fields masked |
| Drill-Down Failure | [Pass/Fail] | Navigation maintained |

---

## 7. Deployment & Access Validation

| Check | Status | Notes |
|-------|--------|-------|
| Cloud URL Accessible | [Yes/No] | Verify HTTPS & login |
| Downloadable Template | [Yes/No] | YAML / JSON config exported |
| CI/CD Deployment | [Pass/Fail] | Hybrid pipeline validation |
| Docker Container | [Pass/Fail] | Build & run successfully |
| Multi-Tenancy Hooks | [Yes/No] | Scaffold verified (inactive) |

---

**Prepared By:** ______________________  
**Reviewed By:** ______________________  
**Approved By:** ______________________  
