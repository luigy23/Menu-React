import React, { useState, useEffect } from 'react';
import { ISend } from '../../Assets/Icons/ISend';
import remarkGfm from 'remark-gfm';
import ReactMarkdown from 'react-markdown';
import { enviarMensaje, obtenerMensajes, limpiarMensajes } from '../../Services/ApiChat';

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Load messages when component mounts
  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    try {
      const historicalMessages = await obtenerMensajes();
      // Transform the messages to match our chat format
      const formattedMessages = historicalMessages.map(msg => ({
        type: msg.role === 'model' ? 'bot' : 'user',
        content: msg.parts[0].text
      }));
      setMessages(formattedMessages);
    } catch (error) {
      console.error('Error al cargar mensajes:', error);
    }
  };

  const handleClearMessages = async () => {
    try {
      await limpiarMensajes();
      setMessages([]);
    } catch (error) {
      console.error('Error al limpiar mensajes:', error);
    }
  };

  const handleSend = async () => {
    if (inputValue.trim() && !isLoading) {
      const userMessage = inputValue.trim();
      
      const newMessages = [
        ...messages,
        { type: 'user', content: userMessage }
      ];
      setMessages(newMessages);
      setInputValue('');
      setIsLoading(true);

      try {
        const response = await enviarMensaje(userMessage);
        setMessages(prevMessages => [
          ...prevMessages,
          { 
            type: 'bot', 
            content: response
          }
        ]);
      } catch (error) {
        setMessages(prevMessages => [
          ...prevMessages,
          { 
            type: 'bot', 
            content: 'Lo siento, ha ocurrido un error al procesar tu mensaje. Por favor, intenta nuevamente.'
          }
        ]);
        console.error('Error al enviar mensaje:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const markdownStyles = {
    p: 'mb-2',
    h1: 'text-xl font-bold mb-2',
    h2: 'text-lg font-bold mb-2',
    h3: 'text-md font-bold mb-2',
    ul: 'list-disc ml-4 mb-2',
    ol: 'list-decimal ml-4 mb-2',
    li: 'mb-1',
    code: 'bg-slate-800 rounded px-1 py-0.5',
    pre: 'bg-slate-800 rounded p-2 mb-2 overflow-x-auto',
    strong: 'font-bold',
    em: 'italic',
    blockquote: 'border-l-4 border-slate-600 pl-2 my-2',
    a: 'text-blue-400 hover:underline',
    table: 'min-w-[200px] border-collapse table-auto mb-2 bg-slate-800 rounded overflow-hidden',
    thead: 'bg-slate-700',
    th: 'border border-slate-600 px-4 py-2 text-left font-semibold',
    td: 'border border-slate-600 px-4 py-2',
    tr: 'hover:bg-slate-700/50 transition-colors',
  };

  return (
    <div className="w-full h-[500px] text-start flex flex-col text-sm bg-slate-900 text-slate-50 shadow-lg rounded-lg overflow-hidden">
      <div className="bg-slate-800 px-6 py-4 border-b border-slate-700 flex justify-between items-center">
        <h2 className="text-lg font-semibold">ChatBot</h2>
        <button
          onClick={handleClearMessages}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
        >
          Limpiar Chat
        </button>
      </div>

      <div className="flex-grow p-4 overflow-y-auto space-y-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-2xl ${
                msg.type === 'user'
                  ? 'bg-blue-600 text-white rounded-br-none'
                  : 'bg-slate-700 text-slate-100 rounded-bl-none'
              }`}
            >
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  p: ({node, ...props}) => <p className={markdownStyles.p} {...props} />,
                  h1: ({node, ...props}) => <h1 className={markdownStyles.h1} {...props} />,
                  h2: ({node, ...props}) => <h2 className={markdownStyles.h2} {...props} />,
                  h3: ({node, ...props}) => <h3 className={markdownStyles.h3} {...props} />,
                  ul: ({node, ...props}) => <ul className={markdownStyles.ul} {...props} />,
                  ol: ({node, ...props}) => <ol className={markdownStyles.ol} {...props} />,
                  li: ({node, ...props}) => <li className={markdownStyles.li} {...props} />,
                  code: ({node, inline, ...props}) => 
                    inline ? (
                      <code className={markdownStyles.code} {...props} />
                    ) : (
                      <pre className={markdownStyles.pre}>
                        <code {...props} />
                      </pre>
                    ),
                  strong: ({node, ...props}) => <strong className={markdownStyles.strong} {...props} />,
                  em: ({node, ...props}) => <em className={markdownStyles.em} {...props} />,
                  blockquote: ({node, ...props}) => <blockquote className={markdownStyles.blockquote} {...props} />,
                  a: ({node, ...props}) => <a className={markdownStyles.a} {...props} target="_blank" rel="noopener noreferrer" />,
                  table: ({node, ...props}) => (
                    <div className="overflow-x-auto">
                      <table className={markdownStyles.table} {...props} />
                    </div>
                  ),
                  thead: ({node, ...props}) => <thead className={markdownStyles.thead} {...props} />,
                  tr: ({node, ...props}) => <tr className={markdownStyles.tr} {...props} />,
                  th: ({node, ...props}) => <th className={markdownStyles.th} {...props} />,
                  td: ({node, ...props}) => <td className={markdownStyles.td} {...props} />,
                }}
              >
                {msg.content}
              </ReactMarkdown>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 bg-slate-800 border-t border-slate-700">
        <div className="flex gap-2">
          <textarea
            rows={1}
            className="flex-grow bg-slate-700 text-slate-100 border border-slate-600 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 resize-none"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Escribe tu mensaje... (puedes usar Markdown y tablas)"
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            className={`bg-blue-600 text-white p-2 rounded-lg transition-colors ${
              isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
            }`}
            disabled={isLoading}
          >
            <ISend className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;