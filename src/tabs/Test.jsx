// Translate labels when language changes
useEffect(() => {
  const translateAll = async () => {
    const newLabels = {};
    for (const key in labels) {
      newLabels[key] = await translateText(labels[key]);
    }
    setTranslated(newLabels);
  };
  translateAll();
}, [language]);
