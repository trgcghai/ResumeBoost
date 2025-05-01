const SuggestionsTab = ({ suggestions }: { suggestions: string[] }) => {
  return (
    <>
      <div className="">
        <h3 className="text-md font-semibold mb-2">Gợi ý cải thiện</h3>
        <div className="flex flex-wrap gap-2">
          <ul>
            {suggestions.map((suggestion, index) => (
              <li key={index} className="text-textDark px-2 py-1 rounded-full">
                {index + 1}. {suggestion}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default SuggestionsTab;
