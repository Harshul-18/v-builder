import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/Card'
import Button from './components/ui/Button';
import Progress from './components/ui/Progress';
import { Alert, AlertDescription, AlertTitle } from './components/ui/Alert';

// Utility function to shuffle an array
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Custom hook for managing quiz state and logic
const useQuizLogic = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [showExplanation, setShowExplanation] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Initialize questions
    const initialQuestions = [
        {
          word: 'Abstruse',
          definition: 'Difficult to understand; obscure',
          sentence: 'The professor\'s ______ lecture left many students confused.',
          options: ['lucid', 'abstruse', 'transparent', 'straightforward'],
          correctAnswer: 'abstruse',
          explanation: 'Abstruse means hard to understand or obscure. It\'s often used to describe complex or esoteric concepts.',
          consecutiveCorrect: 0,
        },
        {
          word: 'Mollify',
          definition: 'To soothe or pacify; to reduce the severity of',
          sentence: 'The CEO tried to ______ the angry shareholders with promises of future dividends.',
          options: ['exacerbate', 'mollify', 'intensify', 'provoke'],
          correctAnswer: 'mollify',
          explanation: 'Mollify means to calm or soothe someone who is angry or upset. It\'s used when someone attempts to reduce tension or anger.',
          consecutiveCorrect: 0,
        },
        {
          word: 'Ephemeral',
          definition: 'Lasting for a very short time',
          sentence: 'The beauty of cherry blossoms is ______, lasting only a few days each year.',
          options: ['eternal', 'ephemeral', 'enduring', 'permanent'],
          correctAnswer: 'ephemeral',
          explanation: 'Ephemeral describes something that lasts for a very short time. It\'s often used to describe fleeting moments or short-lived phenomena.',
          consecutiveCorrect: 0,
        },
        {
          word: 'Ubiquitous',
          definition: 'Present, appearing, or found everywhere',
          sentence: 'Smartphones have become ______ in modern society, with almost everyone owning one.',
          options: ['rare', 'ubiquitous', 'scarce', 'uncommon'],
          correctAnswer: 'ubiquitous',
          explanation: 'Ubiquitous means omnipresent or existing everywhere. It\'s used to describe things that are so widespread that they seem to be present everywhere.',
          consecutiveCorrect: 0,
        },
        {
          word: 'Enigmatic',
          definition: 'Difficult to interpret or understand; mysterious',
          sentence: 'The ______ smile of the Mona Lisa has puzzled art historians for centuries.',
          options: ['obvious', 'enigmatic', 'clear', 'straightforward'],
          correctAnswer: 'enigmatic',
          explanation: 'Enigmatic refers to something that is mysterious, puzzling, or difficult to understand. It\'s often used to describe people, situations, or phenomena that are not easily explained.',
          consecutiveCorrect: 0,
        },
        {
          word: 'Zeal',
          definition: 'Great energy or enthusiasm in pursuit of a cause or objective',
          sentence: 'The young activist approached environmental issues with ______, inspiring others to join the cause.',
          options: ['apathy', 'zeal', 'indifference', 'lethargy'],
          correctAnswer: 'zeal',
          explanation: 'Zeal refers to great enthusiasm or fervor. It\'s often used to describe passionate dedication to a cause or goal.',
          consecutiveCorrect: 0,
        },
        {
          word: 'Taciturn',
          definition: 'Reserved or uncommunicative in speech; saying little',
          sentence: 'The ______ manager rarely spoke in meetings, preferring to listen rather than contribute.',
          options: ['loquacious', 'taciturn', 'verbose', 'garrulous'],
          correctAnswer: 'taciturn',
          explanation: 'Taciturn refers to someone who is habitually silent or reserved in speech, often giving the impression of being unsociable.',
          consecutiveCorrect: 0,
        },
        {
          word: 'Ineffable',
          definition: 'Too great or extreme to be expressed in words',
          sentence: 'The ______ beauty of the sunset left the viewers speechless.',
          options: ['common', 'ineffable', 'ordinary', 'mundane'],
          correctAnswer: 'ineffable',
          explanation: 'Ineffable describes something so magnificent or overwhelming that it cannot be expressed in words.',
          consecutiveCorrect: 0,
        },
        {
          word: 'Sagacious',
          definition: 'Having or showing keen mental discernment and good judgment',
          sentence: 'The ______ leader made wise decisions that benefited the entire company.',
          options: ['foolish', 'sagacious', 'naive', 'ignorant'],
          correctAnswer: 'sagacious',
          explanation: 'Sagacious refers to someone who is wise, shrewd, and has excellent judgment, often in difficult situations.',
          consecutiveCorrect: 0,
        },
        {
          word: 'Cacophony',
          definition: 'A harsh, discordant mixture of sounds',
          sentence: 'The ______ of car horns during rush hour is a common sound in the city.',
          options: ['harmony', 'cacophony', 'melody', 'euphony'],
          correctAnswer: 'cacophony',
          explanation: 'Cacophony refers to a loud, jarring, and unpleasant noise, often a combination of various sounds clashing together.',
          consecutiveCorrect: 0,
        },
        {
          word: 'Munificent',
          definition: 'More generous than is usual or necessary',
          sentence: 'The charity received a ______ donation from the billionaire philanthropist.',
          options: ['stingy', 'munificent', 'greedy', 'miserly'],
          correctAnswer: 'munificent',
          explanation: 'Munificent describes someone who is extremely generous, often giving more than what is needed or expected.',
          consecutiveCorrect: 0,
        },
        {
          word: 'Pernicious',
          definition: 'Having a harmful effect, especially in a gradual or subtle way',
          sentence: 'The ______ effects of pollution on marine life are becoming increasingly apparent.',
          options: ['beneficial', 'pernicious', 'harmless', 'innocuous'],
          correctAnswer: 'pernicious',
          explanation: 'Pernicious describes something that causes harm or damage, often in a subtle or unnoticed manner.',
          consecutiveCorrect: 0,
        },
        {
          word: 'Benevolent',
          definition: 'Well-meaning and kindly',
          sentence: 'The ______ teacher went out of her way to help struggling students.',
          options: ['malevolent', 'benevolent', 'malicious', 'hostile'],
          correctAnswer: 'benevolent',
          explanation: 'Benevolent describes someone who is kind, charitable, and well-intentioned.',
          consecutiveCorrect: 0,
        },
        {
          word: 'Lethargic',
          definition: 'Sluggish and apathetic',
          sentence: 'After the long flight, she felt ______ and had no energy to explore the city.',
          options: ['energetic', 'lethargic', 'vigorous', 'animated'],
          correctAnswer: 'lethargic',
          explanation: 'Lethargic refers to a state of sluggishness, drowsiness, or lack of energy.',
          consecutiveCorrect: 0,
        },
        {
          word: 'Garrulous',
          definition: 'Excessively talkative, especially on trivial matters',
          sentence: 'The ______ neighbor often held up conversations with endless stories.',
          options: ['taciturn', 'garrulous', 'concise', 'succinct'],
          correctAnswer: 'garrulous',
          explanation: 'Garrulous describes someone who talks a lot, often about things that are not important.',
          consecutiveCorrect: 0,
        },
        {
          word: 'Laconic',
          definition: 'Using very few words',
          sentence: 'His ______ response made it clear that he was not interested in the discussion.',
          options: ['verbose', 'laconic', 'garrulous', 'wordy'],
          correctAnswer: 'laconic',
          explanation: 'Laconic refers to a style of speech or writing that uses few words, often to the point of seeming terse or blunt.',
          consecutiveCorrect: 0,
        },
        {
          word: 'Recalcitrant',
          definition: 'Having an obstinately uncooperative attitude towards authority or discipline',
          sentence: 'The ______ employee refused to follow the new company policies.',
          options: ['compliant', 'recalcitrant', 'obedient', 'submissive'],
          correctAnswer: 'recalcitrant',
          explanation: 'Recalcitrant describes someone who is stubbornly resistant to authority or control.',
          consecutiveCorrect: 0,
        },
        {
          word: 'Inimical',
          definition: 'Tending to obstruct or harm',
          sentence: 'The new policy was ______ to the company\'s growth.',
          options: ['beneficial', 'inimical', 'favorable', 'advantageous'],
          correctAnswer: 'inimical',
          explanation: 'Inimical refers to something that is harmful or adverse, often creating difficulties or hindrances.',
          consecutiveCorrect: 0,
        },
        {
          word: 'Loquacious',
          definition: 'Tending to talk a great deal; talkative',
          sentence: 'The ______ host kept the conversation going throughout the night.',
          options: ['silent', 'loquacious', 'reserved', 'reticent'],
          correctAnswer: 'loquacious',
          explanation: 'Loquacious refers to someone who talks a lot, often in an engaging and friendly manner.',
          consecutiveCorrect: 0,
        },
        {
          word: 'Altruistic',
          definition: 'Showing a selfless concern for the well-being of others',
          sentence: 'Her ______ actions were praised by everyone in the community.',
          options: ['selfish', 'altruistic', 'egocentric', 'greedy'],
          correctAnswer: 'altruistic',
          explanation: 'Altruistic describes someone who is selflessly concerned with the welfare of others, often putting others\' needs before their own.',
          consecutiveCorrect: 0,
        },
        {
          word: 'Obdurate',
          definition: 'Stubbornly refusing to change one\'s opinion or course of action',
          sentence: 'Despite the evidence, the politician remained ______ in his views.',
          options: ['flexible', 'obdurate', 'yielding', 'compliant'],
          correctAnswer: 'obdurate',
          explanation: 'Obdurate describes someone who is stubbornly persistent in their opinions or decisions, often in the face of opposition or reason.',
          consecutiveCorrect: 0,
        },
        {
          word: 'Surreptitious',
          definition: 'Kept secret, especially because it would not be approved of',
          sentence: 'They had a ______ meeting in the alley to discuss their plans.',
          options: ['open', 'surreptitious', 'transparent', 'public'],
          correctAnswer: 'surreptitious',
          explanation: 'Surreptitious refers to actions done in secret, often because they are unauthorized or disapproved of.',
          consecutiveCorrect: 0,
        },
        {
          word: 'Venerate',
          definition: 'Regard with great respect; revere',
          sentence: 'The monk was ______ for his years of service and wisdom.',
          options: ['disregarded', 'venerated', 'disrespected', 'ignored'],
          correctAnswer: 'venerated',
          explanation: 'Venerate means to regard with deep respect and reverence, often reserved for individuals who are highly esteemed for their wisdom or achievements.',
          consecutiveCorrect: 0,
        },
        {
          word: 'Trepidation',
          definition: 'A feeling of fear or anxiety about something that may happen',
          sentence: 'She approached the exam room with ______, worried about the test.',
          options: ['calm', 'trepidation', 'confidence', 'ease'],
          correctAnswer: 'trepidation',
          explanation: 'Trepidation refers to a sense of fear or apprehension, often in anticipation of something unpleasant.',
          consecutiveCorrect: 0,
        },
        {
          word: 'Iconoclast',
          definition: 'A person who attacks or criticizes cherished beliefs or institutions',
          sentence: 'The ______ challenged traditional views, sparking controversy.',
          options: ['conformist', 'iconoclast', 'traditionalist', 'conservative'],
          correctAnswer: 'iconoclast',
          explanation: 'Iconoclast describes someone who challenges established norms, beliefs, or institutions, often provoking debate or opposition.',
          consecutiveCorrect: 0,
        },
        {
          word: 'Pedantic',
          definition: 'Excessively concerned with minor details or rules; overly scholarly',
          sentence: 'The professor\'s ______ approach made the lecture difficult to follow.',
          options: ['informal', 'pedantic', 'casual', 'relaxed'],
          correctAnswer: 'pedantic',
          explanation: 'Pedantic describes someone who is overly concerned with minor details, often in a way that is tedious or overly academic.',
          consecutiveCorrect: 0,
        },
        {
          word: 'Soporific',
          definition: 'Tending to induce drowsiness or sleep',
          sentence: 'The ______ effects of the medication made it difficult to stay awake.',
          options: ['stimulating', 'soporific', 'energizing', 'invigorating'],
          correctAnswer: 'soporific',
          explanation: 'Soporific refers to something that induces sleep or drowsiness, often used to describe drugs or activities that make one sleepy.',
          consecutiveCorrect: 0,
        },
        {
          word: 'Ostentatious',
          definition: 'Characterized by vulgar or pretentious display; designed to impress or attract notice',
          sentence: 'The ______ mansion was filled with gold-plated furniture and expensive art.',
          options: ['modest', 'ostentatious', 'simple', 'understated'],
          correctAnswer: 'ostentatious',
          explanation: 'Ostentatious describes something that is flashy, showy, or designed to attract attention, often in a way that is considered excessive or in bad taste.',
          consecutiveCorrect: 0,
        },
        {
          word: 'Prolific',
          definition: 'Producing much fruit or foliage or many offspring; producing many works or results',
          sentence: 'The ______ author published three novels in one year.',
          options: ['unproductive', 'prolific', 'barren', 'infertile'],
          correctAnswer: 'prolific',
          explanation: 'Prolific refers to someone or something that produces a large quantity of output, whether it\'s artistic works, offspring, or results.',
          consecutiveCorrect: 0,
        },
        {
          word: 'Intransigent',
          definition: 'Unwilling or refusing to change one\'s views or to agree about something',
          sentence: 'The ______ negotiator would not budge on his demands.',
          options: ['flexible', 'intransigent', 'compliant', 'accommodating'],
          correctAnswer: 'intransigent',
          explanation: 'Intransigent describes someone who is stubborn and refuses to compromise or change their position, even in negotiations or discussions.',
          consecutiveCorrect: 0,
        },
        {
          word: 'Capricious',
          definition: 'Given to sudden and unaccountable changes of mood or behavior',
          sentence: 'The boss\'s ______ decisions made it difficult to plan ahead.',
          options: ['consistent', 'capricious', 'predictable', 'steady'],
          correctAnswer: 'capricious',
          explanation: 'Capricious describes someone who is unpredictable and prone to sudden changes in mood or behavior, often without clear reason.',
          consecutiveCorrect: 0,
        },
        {
          word: 'Misanthrope',
          definition: 'A person who dislikes humankind and avoids human society',
          sentence: 'The ______ lived alone in the woods, far away from civilization.',
          options: ['philanthropist', 'misanthrope', 'socialite', 'extrovert'],
          correctAnswer: 'misanthrope',
          explanation: 'Misanthrope refers to someone who has a deep distrust or dislike of other people and often prefers to be alone.',
          consecutiveCorrect: 0,
        },
        {
          word: 'Austere',
          definition: 'Severe or strict in manner, attitude, or appearance; having no comforts or luxuries',
          sentence: 'The ______ decor of the monastery reflected the monks\' ascetic lifestyle.',
          options: ['lavish', 'austere', 'opulent', 'extravagant'],
          correctAnswer: 'austere',
          explanation: 'Austere describes something that is plain, simple, and without luxury, often associated with strictness or severity.',
          consecutiveCorrect: 0,
        },
        {
          word: 'Contrite',
          definition: 'Feeling or expressing remorse or penitence; affected by guilt',
          sentence: 'After realizing his mistake, he was ______ and apologized to everyone.',
          options: ['unrepentant', 'contrite', 'indifferent', 'callous'],
          correctAnswer: 'contrite',
          explanation: 'Contrite describes someone who feels or shows regret for their wrongdoing, often leading to an apology or reparative actions.',
          consecutiveCorrect: 0,
        },
        {
          word: 'Phlegmatic',
          definition: 'Having an unemotional and stolidly calm disposition',
          sentence: 'Despite the chaos around him, he remained ______ and focused.',
          options: ['excitable', 'phlegmatic', 'passionate', 'volatile'],
          correctAnswer: 'phlegmatic',
          explanation: 'Phlegmatic refers to someone who is calm, composed, and not easily excited, often displaying a cool, unemotional demeanor.',
          consecutiveCorrect: 0,
        },
        {
          word: 'Ebullient',
          definition: 'Cheerful and full of energy',
          sentence: 'The ______ crowd cheered as the band took the stage.',
          options: ['apathetic', 'ebullient', 'lethargic', 'indifferent'],
          correctAnswer: 'ebullient',
          explanation: 'Ebullient describes someone who is full of energy, enthusiasm, and excitement, often expressed in a lively or bubbly manner.',
          consecutiveCorrect: 0,
        },
        {
          word: 'Sycophant',
          definition: 'A person who acts obsequiously towards someone important in order to gain advantage',
          sentence: 'The ______ constantly praised the boss, hoping for a promotion.',
          options: ['critic', 'sycophant', 'rebel', 'opponent'],
          correctAnswer: 'sycophant',
          explanation: 'Sycophant refers to someone who flatters or fawns over influential people to gain favor or advantage, often in a servile or obsequious manner.',
          consecutiveCorrect: 0,
        },
        {
          word: 'Disparate',
          definition: 'Essentially different in kind; not allowing comparison',
          sentence: 'The committee members had ______ views on how to proceed with the project.',
          options: ['similar', 'disparate', 'homogeneous', 'uniform'],
          correctAnswer: 'disparate',
          explanation: 'Disparate describes things that are fundamentally different and cannot be easily compared or reconciled.',
          consecutiveCorrect: 0,
        },
        {
          word: 'Bellicose',
          definition: 'Demonstrating aggression and willingness to fight',
          sentence: 'The ______ rhetoric of the leader raised concerns of an impending conflict.',
          options: ['peaceful', 'bellicose', 'pacifist', 'conciliatory'],
          correctAnswer: 'bellicose',
          explanation: 'Bellicose describes someone who is aggressive and inclined to start conflicts or engage in fights.',
          consecutiveCorrect: 0,
        },
        {
            word: 'Mercurial',
            definition: 'Subject to sudden or unpredictable changes of mood or mind',
            sentence: 'The CEO\'s ______ temperament made it challenging for employees to anticipate his reactions.',
            options: ['stable', 'mercurial', 'consistent', 'predictable'],
            correctAnswer: 'mercurial',
            explanation: 'Mercurial describes someone whose mood or opinions change quickly and often unpredictably.',
            consecutiveCorrect: 0,
          },
          {
            word: 'Perfunctory',
            definition: 'Carried out with a minimum of effort or reflection',
            sentence: 'The security guard gave a ______ glance at the ID badges, barely looking at them.',
            options: ['thorough', 'perfunctory', 'meticulous', 'comprehensive'],
            correctAnswer: 'perfunctory',
            explanation: 'Perfunctory refers to actions done routinely and with little interest or care.',
            consecutiveCorrect: 0,
          },
          {
            word: 'Magnanimous',
            definition: 'Very generous or forgiving, especially toward a rival or less powerful person',
            sentence: 'Despite their past conflicts, the winner was ______ in victory, praising his opponent\'s efforts.',
            options: ['petty', 'magnanimous', 'vindictive', 'spiteful'],
            correctAnswer: 'magnanimous',
            explanation: 'Magnanimous describes someone who is noble, generous, and forgiving, especially in victory or toward those less powerful.',
            consecutiveCorrect: 0,
          },
          {
            word: 'Equivocal',
            definition: 'Open to more than one interpretation; ambiguous',
            sentence: 'The politician\'s ______ statement left both supporters and critics unsure of his true position.',
            options: ['clear', 'equivocal', 'unambiguous', 'explicit'],
            correctAnswer: 'equivocal',
            explanation: 'Equivocal refers to something that is ambiguous or open to multiple interpretations.',
            consecutiveCorrect: 0,
          },
          {
            word: 'Fastidious',
            definition: 'Very attentive to and concerned about accuracy and detail',
            sentence: 'The ______ chef insisted on personally inspecting every dish before it left the kitchen.',
            options: ['careless', 'fastidious', 'sloppy', 'negligent'],
            correctAnswer: 'fastidious',
            explanation: 'Fastidious describes someone who pays great attention to detail and is very careful about accuracy and cleanliness.',
            consecutiveCorrect: 0,
          },
          {
            word: 'Insidious',
            definition: 'Proceeding in a gradual, subtle way, but with harmful effects',
            sentence: 'The ______ influence of social media on mental health is often underestimated.',
            options: ['obvious', 'insidious', 'blatant', 'overt'],
            correctAnswer: 'insidious',
            explanation: 'Insidious refers to something harmful that develops gradually or in a subtle, often unnoticed manner.',
            consecutiveCorrect: 0,
          },
          {
            word: 'Perspicacious',
            definition: 'Having a ready insight into and understanding of things',
            sentence: 'The detective\'s ______ observations led to a quick resolution of the case.',
            options: ['obtuse', 'perspicacious', 'dull', 'unperceptive'],
            correctAnswer: 'perspicacious',
            explanation: 'Perspicacious describes someone who is quick to understand or notice things, showing acute discernment.',
            consecutiveCorrect: 0,
          },
          {
            word: 'Esoteric',
            definition: 'Intended for or understood by only a small number of people with specialized knowledge or interest',
            sentence: 'The professor\'s lecture on quantum mechanics was too ______ for most of the undergraduate students.',
            options: ['common', 'esoteric', 'simple', 'widespread'],
            correctAnswer: 'esoteric',
            explanation: 'Esoteric refers to knowledge or interests that are specialized and not widely understood.',
            consecutiveCorrect: 0,
          },
          {
            word: 'Quixotic',
            definition: 'Exceedingly idealistic; unrealistic and impractical',
            sentence: 'His ______ plan to solve world hunger in a year was admired for its ambition but criticized for its impracticality.',
            options: ['pragmatic', 'quixotic', 'realistic', 'practical'],
            correctAnswer: 'quixotic',
            explanation: 'Quixotic describes ideas or plans that are idealistic to the point of being unrealistic or impractical.',
            consecutiveCorrect: 0,
          },
          {
            word: 'Ameliorate',
            definition: 'Make (something bad or unsatisfactory) better',
            sentence: 'The new policies were designed to ______ the living conditions in impoverished areas.',
            options: ['worsen', 'ameliorate', 'exacerbate', 'aggravate'],
            correctAnswer: 'ameliorate',
            explanation: 'Ameliorate means to improve or make a bad situation better.',
            consecutiveCorrect: 0,
          },
      ];
    setQuestions(initialQuestions);
    setCurrentQuestion(getNextQuestion(initialQuestions));
  }, []);

  const getNextQuestion = (questionList) => {
    const unansweredQuestions = questionList.filter(q => q.consecutiveCorrect < 2);
    if (unansweredQuestions.length === 0) return null;
    const nextQuestion = unansweredQuestions[Math.floor(Math.random() * unansweredQuestions.length)];
    return { ...nextQuestion, options: shuffleArray(nextQuestion.options) };
  };

  const handleAnswer = (answer) => {
    setUserAnswer(answer);
    setShowExplanation(true);

    const updatedQuestions = questions.map(q => {
      if (q.word === currentQuestion.word) {
        if (answer === q.correctAnswer) {
          return { ...q, consecutiveCorrect: q.consecutiveCorrect + 1 };
        } else {
          return { ...q, consecutiveCorrect: 0 };
        }
      }
      return q;
    });

    setQuestions(updatedQuestions);
    
    const totalCorrect = updatedQuestions.filter(q => q.consecutiveCorrect === 2).length;
    setProgress((totalCorrect / questions.length) * 100);
  };

  const nextQuestion = () => {
    setShowExplanation(false);
    setUserAnswer('');
    setCurrentQuestion(getNextQuestion(questions));
  };

  return { currentQuestion, userAnswer, showExplanation, handleAnswer, nextQuestion, progress };
};

const GREVocabQuiz = () => {
  const { currentQuestion, userAnswer, showExplanation, handleAnswer, nextQuestion, progress } = useQuizLogic();

  if (!currentQuestion) {
    return (
      <Card className="w-full max-w-md mx-auto mt-8">
        <CardHeader>
          <CardTitle>Congratulations!</CardTitle>
        </CardHeader>
        <CardContent>
          <p>You've completed the quiz and mastered all 100 GRE vocabulary words!</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">GRE Vocabulary Quiz</h1>
      <Progress value={progress} className="w-full mb-4" />
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Fill in the blank with the most appropriate word:</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 italic">{currentQuestion.sentence}</p>
          <div className="grid grid-cols-2 gap-2">
            {currentQuestion.options.map((option, index) => (
              <Button
                key={index}
                onClick={() => handleAnswer(option)}
                variant={userAnswer === option ? (option === currentQuestion.correctAnswer ? 'default' : 'destructive') : 'outline'}
                disabled={showExplanation}
              >
                {option}
              </Button>
            ))}
          </div>
          {showExplanation && (
            <Alert className="mt-4">
              <AlertTitle>{userAnswer === currentQuestion.correctAnswer ? 'Correct!' : 'Incorrect'}</AlertTitle>
              <AlertDescription>
                <p><strong>Word:</strong> {currentQuestion.word}</p>
                <p><strong>Definition:</strong> {currentQuestion.definition}</p>
                <p><strong>Explanation:</strong> {currentQuestion.explanation}</p>
              </AlertDescription>
            </Alert>
          )}
          {showExplanation && (
            <Button onClick={nextQuestion} className="mt-4 w-full">
              Next Question
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default GREVocabQuiz;