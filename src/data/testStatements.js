// 40 pairs of personality test statements (80 total statements)
// Each pair contrasts two different styles: Action, Process, People, Ideas

export const testStatements = [
  {
    id: 1,
    left: { text: "I prefer to take immediate action on tasks", category: "Action" },
    right: { text: "I prefer to plan thoroughly before starting", category: "Process" }
  },
  {
    id: 2,
    left: { text: "I make decisions quickly and move forward", category: "Action" },
    right: { text: "I enjoy building relationships with team members", category: "People" }
  },
  {
    id: 3,
    left: { text: "I focus on getting results fast", category: "Action" },
    right: { text: "I like exploring new concepts and possibilities", category: "Ideas" }
  },
  {
    id: 4,
    left: { text: "I value following established procedures", category: "Process" },
    right: { text: "I prioritize team harmony and collaboration", category: "People" }
  },
  {
    id: 5,
    left: { text: "I prefer detailed documentation and structure", category: "Process" },
    right: { text: "I enjoy brainstorming innovative solutions", category: "Ideas" }
  },
  {
    id: 6,
    left: { text: "I care deeply about how others feel", category: "People" },
    right: { text: "I love thinking about future possibilities", category: "Ideas" }
  },
  {
    id: 7,
    left: { text: "I'm energized by completing tasks quickly", category: "Action" },
    right: { text: "I'm energized by creating efficient systems", category: "Process" }
  },
  {
    id: 8,
    left: { text: "I thrive in fast-paced environments", category: "Action" },
    right: { text: "I thrive when helping others succeed", category: "People" }
  },
  {
    id: 9,
    left: { text: "I prefer hands-on problem solving", category: "Action" },
    right: { text: "I prefer theoretical problem solving", category: "Ideas" }
  },
  {
    id: 10,
    left: { text: "I like maintaining quality standards", category: "Process" },
    right: { text: "I like mentoring and supporting others", category: "People" }
  },
  {
    id: 11,
    left: { text: "I enjoy organizing and optimizing workflows", category: "Process" },
    right: { text: "I enjoy imagining what could be", category: "Ideas" }
  },
  {
    id: 12,
    left: { text: "I'm good at understanding people's emotions", category: "People" },
    right: { text: "I'm good at connecting abstract concepts", category: "Ideas" }
  },
  {
    id: 13,
    left: { text: "I want to see tangible results today", category: "Action" },
    right: { text: "I want to ensure everything is done correctly", category: "Process" }
  },
  {
    id: 14,
    left: { text: "I'm motivated by achieving goals", category: "Action" },
    right: { text: "I'm motivated by positive relationships", category: "People" }
  },
  {
    id: 15,
    left: { text: "I focus on practical implementation", category: "Action" },
    right: { text: "I focus on creative thinking", category: "Ideas" }
  },
  {
    id: 16,
    left: { text: "I value consistency and reliability", category: "Process" },
    right: { text: "I value empathy and understanding", category: "People" }
  },
  {
    id: 17,
    left: { text: "I prefer step-by-step instructions", category: "Process" },
    right: { text: "I prefer open-ended exploration", category: "Ideas" }
  },
  {
    id: 18,
    left: { text: "I build trust through listening", category: "People" },
    right: { text: "I build excitement through vision", category: "Ideas" }
  },
  {
    id: 19,
    left: { text: "I tackle challenges head-on", category: "Action" },
    right: { text: "I analyze challenges systematically", category: "Process" }
  },
  {
    id: 20,
    left: { text: "I'm direct and assertive in communication", category: "Action" },
    right: { text: "I'm warm and supportive in communication", category: "People" }
  },
  {
    id: 21,
    left: { text: "I value speed over perfection", category: "Action" },
    right: { text: "I value innovation over convention", category: "Ideas" }
  },
  {
    id: 22,
    left: { text: "I follow proven methods", category: "Process" },
    right: { text: "I create inclusive team environments", category: "People" }
  },
  {
    id: 23,
    left: { text: "I'm detail-oriented and thorough", category: "Process" },
    right: { text: "I'm visionary and forward-thinking", category: "Ideas" }
  },
  {
    id: 24,
    left: { text: "I resolve conflicts through dialogue", category: "People" },
    right: { text: "I resolve conflicts through new perspectives", category: "Ideas" }
  },
  {
    id: 25,
    left: { text: "I prefer doing to discussing", category: "Action" },
    right: { text: "I prefer planning to rushing", category: "Process" }
  },
  {
    id: 26,
    left: { text: "I'm competitive and results-driven", category: "Action" },
    right: { text: "I'm collaborative and team-oriented", category: "People" }
  },
  {
    id: 27,
    left: { text: "I focus on what works now", category: "Action" },
    right: { text: "I focus on what's possible tomorrow", category: "Ideas" }
  },
  {
    id: 28,
    left: { text: "I ensure accuracy and precision", category: "Process" },
    right: { text: "I ensure everyone feels valued", category: "People" }
  },
  {
    id: 29,
    left: { text: "I create order from chaos", category: "Process" },
    right: { text: "I create meaning from complexity", category: "Ideas" }
  },
  {
    id: 30,
    left: { text: "I'm sensitive to team dynamics", category: "People" },
    right: { text: "I'm curious about new theories", category: "Ideas" }
  },
  {
    id: 31,
    left: { text: "I push projects forward aggressively", category: "Action" },
    right: { text: "I refine projects methodically", category: "Process" }
  },
  {
    id: 32,
    left: { text: "I take charge in uncertain situations", category: "Action" },
    right: { text: "I support others in uncertain situations", category: "People" }
  },
  {
    id: 33,
    left: { text: "I'm pragmatic and realistic", category: "Action" },
    right: { text: "I'm imaginative and creative", category: "Ideas" }
  },
  {
    id: 34,
    left: { text: "I maintain standards and protocols", category: "Process" },
    right: { text: "I maintain positive team morale", category: "People" }
  },
  {
    id: 35,
    left: { text: "I document everything carefully", category: "Process" },
    right: { text: "I question everything curiously", category: "Ideas" }
  },
  {
    id: 36,
    left: { text: "I'm patient with people's growth", category: "People" },
    right: { text: "I'm excited by intellectual challenges", category: "Ideas" }
  },
  {
    id: 37,
    left: { text: "I make quick decisions under pressure", category: "Action" },
    right: { text: "I follow procedures under pressure", category: "Process" }
  },
  {
    id: 38,
    left: { text: "I'm bold and risk-taking", category: "Action" },
    right: { text: "I'm caring and nurturing", category: "People" }
  },
  {
    id: 39,
    left: { text: "I measure success by output", category: "Action" },
    right: { text: "I measure success by innovation", category: "Ideas" }
  },
  {
    id: 40,
    left: { text: "I value systematic approaches", category: "Process" },
    right: { text: "I value interpersonal connections", category: "People" }
  }
]
