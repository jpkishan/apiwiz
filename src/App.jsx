import { useState, useEffect } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.scss'
import axios from 'axios';

const App = () => {
  const [inputText, setInputText] = useState('');
  const [screen, setScreen] = useState(true);
  const [metrics, setMetrics] = useState({
    characters: 0,
    words: 0,
    sentences: 0,
    paragraphs: 0,
    spaces: 0,
    punctuations: 0,
  });
  const [wordDetails, setWordDetails] = useState(null);

  useEffect(() => {
    updateMetrics();
  }, [inputText]);

  const updateMetrics = () => {
    const charCount = inputText.length;
    const wordCount = inputText.split(/\s+/).filter(word => word.length > 0).length;
    const sentenceCount = (inputText.match(/[.!?]/g) || []).length;
    const paragraphCount = (inputText.split(/\n+/).filter(paragraph => paragraph.length > 0)).length;
    const spaceCount = (inputText.match(/\s/g) || []).length;
    const punctuationCount = (inputText.match(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g) || []).length;

    setMetrics({
      characters: charCount,
      words: wordCount,
      sentences: sentenceCount,
      paragraphs: paragraphCount,
      spaces: spaceCount,
      punctuations: punctuationCount,
    });

    const lastWord = inputText.trim().split(/\s+/).pop();
    if (lastWord) {
      fetchWordDetails(lastWord);
    } else {
      setWordDetails(null);
    }
  };

  function changeBtnColor(event) {
    const btn1 = document.getElementById('btn-1')
    const btn2 = document.getElementById('btn-2')
    if (event.target.id === 'btn-2') {
      btn2.classList.add('btn-color')
      btn1.classList.remove('btn-color')
    }
    else {
      btn1.classList.add('btn-color')
      btn2.classList.remove('btn-color')

    }
  }

  const fetchWordDetails = async () => {
    try {
      const response = await axios.get(`https://wordsapiv1.p.mashape.com/words/cat`);
      console.log(response)
      const data = response.data.definitions ? response.data.definitions[0] : null;
      setWordDetails(data);
    } catch (error) {
      console.error('Error fetching word details:', error);
      setWordDetails(null);
    }
  };

  useEffect(() => {
    fetchWordDetails();
  }, [])

  return (
    <div className="main">
      <div className='inner'>
        <div className='header'>
          <h2>Text Analyzer</h2>
          <span>
            Text Analyzer is a simple free online tool for SEO web content analysis that helps you find most frequent phrases and words, number of characters, words, sentences and paragraphs, and estimated read and speak time of your content.
          </span>
        </div>
        <div className='body'>
          <div className='body-head'>
            <div className='body-head-inner-1'>
              <button id="btn-1" className='btn-color' name="word" onClick={(event) => {
                changeBtnColor(event);
                setScreen(true)
              }}>Word Input</button>
              <button id="btn-2" name="para" onClick={(event) => {
                changeBtnColor(event);
                setScreen(false)
              }}>Paragraph</button>
            </div>
            <div className='body-head-inner-2'>
              <input></input>
              <button>Process Word</button>
            </div>
            <div className='toggle-screen'>
              {screen ?
                <>
                  <div className='body-table'>
                    <table>
                      <thead>
                        <tr>
                          <th>Characters</th>
                          <th>Words</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>5</td>
                          <td>1</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className='body-footer'>
                    <div>
                      <span>Definition:</span>
                      <span>in, relating to, or characteristic of a town or city.
                        the urban population</span>
                    </div>
                    <div>
                      <span>Parts of Speech:</span>
                      <span>Noun</span>
                    </div>
                    <div>
                      <span>Synonyms:</span>
                      <span>Town</span>
                    </div>
                    <div>
                      <span>Antonyms:</span>
                      <span>Rural</span>
                    </div>
                  </div>
                </>
                :
                <>
                  <div className='body-footer-2'>
                    <textarea placeholder="Type your text here..."
                    ></textarea>
                    <div className='body-table'>
                      <table>
                        <thead>
                          <tr>
                            <th>Characters</th>
                            <th>Words</th>
                            <th>Sentences</th>
                            <th>Paragraphs</th>
                            <th>Spaces</th>
                            <th>Punctuations</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>1060</td>
                            <td>187</td>
                            <td>21</td>
                            <td>1</td>
                            <td>174</td>
                            <td>41</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </>
              }
            </div>
          </div>
        </div>
      </div>
      {/* <textarea
        placeholder="Type your text here..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
      <div className="metrics-container">
        <p>Characters: {metrics.characters}</p>
        <p>Words: {metrics.words}</p>
        <p>Sentences: {metrics.sentences}</p>
        <p>Paragraphs: {metrics.paragraphs}</p>
        <p>Spaces: {metrics.spaces}</p>
        <p>Punctuations: {metrics.punctuations}</p>
      </div>
      <div className="word-details-container">
        <h3>Word Details</h3>
        {wordDetails ? (
          <div>
            <p><strong>Definition:</strong> {wordDetails.definition || 'N/A'}</p>
            <p><strong>Part of Speech:</strong> {wordDetails.partOfSpeech || 'N/A'}</p>
            <p><strong>Synonyms:</strong> {wordDetails.synonyms ? wordDetails.synonyms.join(', ') : 'N/A'}</p>
          </div>
        ) : (
          <p>No word details available</p>
        )}
      </div> */}
    </div>
  );
};

export default App;