/**
 * Compliance Reporting Module
 * Generates comprehensive compliance reports for PCI DSS requirements
 */

const PCIDSSValidator = require('./PCIDSSValidator');

class ComplianceReporter {
    async generateComplianceReport() {
        const results = await validateCompliance();
        return this.formatReport(results);
    }

    formatReport(results) {
        return {
            summary: this.generateSummary(results),
            details: this.generateDetails(results),
            recommendations: this.generateRecommendations(results),
            timestamp: new Date().toISOString()
        };
    }

    generateSummary(results) {
        const totalChecks = Object.keys(results.requirements).length;
        const passedChecks = Object.values(results.requirements)
            .filter(req => req.passed).length;

        return {
            status: results.compliant ? 'COMPLIANT' : 'NON-COMPLIANT',
            passedChecks,
            totalChecks,
            complianceScore: (passedChecks / totalChecks) * 100,
            lastChecked: results.timestamp
        };
    }

    generateDetails(results) {
        const details = {};
        for (const [reqId, requirement] of Object.entries(results.requirements)) {
            details[reqId] = {
                name: requirement.name,
                status: requirement.passed ? 'PASSED' : 'FAILED',
                details: requirement.details,
                required: requirement.required
            };
        }
        return details;
    }

    generateRecommendations(results) {
        const recommendations = [];
        for (const [reqId, requirement] of Object.entries(results.requirements)) {
            if (!requirement.passed) {
                recommendations.push({
                    requirement: requirement.name,
                    id: reqId,
                    priority: requirement.required ? 'HIGH' : 'MEDIUM',
                    recommendation: this.getRecommendation(reqId, requirement)
                });
            }
        }
        return recommendations;
    }

    getRecommendation(reqId, requirement) {
        const recommendations = {
            req1: 'Review and update firewall configuration to ensure compliance',
            req2: 'Audit and update all vendor-supplied defaults',
            req3: 'Enhance data protection measures for cardholder data',
            req4: 'Review and strengthen data transmission encryption',
            req5: 'Update antivirus software and ensure real-time protection',
            req6: 'Review and update secure development practices',
            req7: 'Strengthen access control mechanisms',
            req8: 'Audit and update user identification system',
            req9: 'Enhance physical security controls',
            req10: 'Improve access monitoring and logging',
            req11: 'Schedule and perform security testing',
            req12: 'Update and maintain security policies',
            reqDB: 'Review and enhance database security controls'
        };

        return recommendations[reqId] || 'Review and update controls for this requirement';
    }

    async generateExecutiveSummary(results) {
        const summary = this.generateSummary(results);
        return {
            title: 'PCI DSS Compliance Executive Summary',
            status: summary.status,
            score: summary.complianceScore.toFixed(2) + '%',
            criticalFindings: this.getCriticalFindings(results),
            nextSteps: this.getNextSteps(results),
            lastAssessment: summary.lastChecked
        };
    }

    getCriticalFindings(results) {
        return Object.entries(results.requirements)
            .filter(([, req]) => !req.passed && req.required)
            .map(([, req]) => ({
                requirement: req.name,
                impact: 'HIGH',
                details: req.details
            }));
    }

    getNextSteps(results) {
        const criticalFindings = this.getCriticalFindings(results);
        if (criticalFindings.length === 0) {
            return ['Maintain current security controls', 'Prepare for next assessment'];
        }

        return criticalFindings.map(finding => 
            `Address ${finding.requirement} compliance issues`);
    }
}

module.exports = new ComplianceReporter();
