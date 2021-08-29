test('Formats date to DD-MM-YYYY', () => {
    const input = new Date();
    // Convert to DD-MM-YYYY

    const newdate = input.toLocaleDateString('de-DE', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    })
    console.log(newdate);
})