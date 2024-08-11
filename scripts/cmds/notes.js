const fs = require('fs');
const path = require('path');

const notesDir = path.join(__dirname, 'notes');
if (!fs.existsSync(notesDir)) {
    fs.mkdirSync(notesDir);
}

module.exports = {
    config: {
        name: "notes",
        version: "1.0",
        author: "Cruizex",
        shortDescription: "X-notes",
    },

    onStart: async function ({ api, args, message }) {
        if (!message) {
            console.error("Message object is undefined.");
            return;
        }

        // Check if the command is to view a specific note by name
        if (args.length === 1) {
            const noteName = args[0].toLowerCase();
            const notePath = path.join(notesDir, `${noteName}.txt`);
            if (fs.existsSync(notePath)) {
                const noteContent = fs.readFileSync(notePath, 'utf8');
                return message.reply(noteContent);
            } else {
                return message.reply(`Note "${noteName}" not found.`);
            }
        }

        // Check if the command is for adding or deleting a note
        const subCommand = args.shift();
        switch (subCommand) {
            case 'add':
                // Ensure there are enough arguments for adding a note
                if (args.length < 2) {
                    return message.reply('Please provide a note name and content.');
                }
                const noteNameToAdd = args[0].toLowerCase();
                const noteContentToAdd = args.slice(1).join(' ');
                const notePathToAdd = path.join(notesDir, `${noteNameToAdd}.txt`);
                fs.writeFileSync(notePathToAdd, noteContentToAdd);
                return message.reply(`Note "${noteNameToAdd}" added successfully ✅`);
            
            case 'del':
                // Ensure there are enough arguments for deleting a note
                if (args.length < 1) {
                    return message.reply('Please provide the name of the note to delete.');
                }
                const noteNameToDelete = args[0].toLowerCase();
                const notePathToDelete = path.join(notesDir, `${noteNameToDelete}.txt`);
                if (!fs.existsSync(notePathToDelete)) {
                    return message.reply(`Note "${noteNameToDelete}" not found ❗`);
                }
                fs.unlinkSync(notePathToDelete);
                return message.reply(`Note "${noteNameToDelete}" deleted successfully ⭕`);
        }

        // Pagination logic
        const noteFiles = fs.readdirSync(notesDir);
        const pageSize = 30; // Maximum number of notes per page
        const pageIndex = subCommand ? parseInt(subCommand, 10) : 1;

        if (isNaN(pageIndex) || pageIndex < 1) {
            return message.reply('Invalid page number.');
        }

        const totalPages = Math.ceil(noteFiles.length / pageSize);
        const startIdx = (pageIndex - 1) * pageSize;
        const endIdx = startIdx + pageSize;
        const pageFiles = noteFiles.slice(startIdx, endIdx);

        if (pageFiles.length === 0) {
            return message.reply('No notes to display on this page.');
        }

        const formattedNotes = pageFiles
            .map(noteFile => `\u2022 ${path.parse(noteFile).name.replace(/\.txt$/, '')}`)
            .join('\n');

        let notesMessage = `Notes 📝(Page ${pageIndex}/${totalPages}):\n${formattedNotes}`;

        if (endIdx < noteFiles.length) {
            notesMessage += `\n\nTo view the next page, use: notes ${pageIndex + 1}`;
        }

        // If the message contains the page number, edit it
        if (message.body && message.body.startsWith('notes')) {
            const pageIndexMatch = message.body.match(/\b\d+\b/);
            if (pageIndexMatch) {
                const pageIndexRequested = parseInt(pageIndexMatch[0], 10);
                if (pageIndexRequested >= 1 && pageIndexRequested <= totalPages) {
                    const startIdxRequested = (pageIndexRequested - 1) * pageSize;
                    const endIdxRequested = startIdxRequested + pageSize;
                    const pageFilesRequested = noteFiles.slice(startIdxRequested, endIdxRequested);

                    const formattedNotesRequested = pageFilesRequested
                        .map(noteFile => `\u2022 ${path.parse(noteFile).name.replace(/\.txt$/, '')}`)
                        .join('\n');

                    notesMessage = `Notes (Page ${pageIndexRequested}/${totalPages}):\n${formattedNotesRequested}`;

                    if (endIdxRequested < noteFiles.length) {
                        notesMessage += `\n\nTo view the next page, use: notes ${pageIndexRequested + 1}`;
                    }

                    await api.editMessage(notesMessage, message.messageID);
                    return;
                }
            }
        }

        // If not editing, reply with the notes message
        message.reply(notesMessage);
    }
};
