class PersonalLibrary {
    constructor() {
        this.books = [];
        this.currentFilter = 'all';
        this.readingGoal = 3;
        this.STORAGE_KEY = 'PERSONAL_LIBRARY_BOOKS_V3';
        this.init();
    }

    init() {
        this.loadData();
        this.bindDOMEvents();
        this.render();
    }
    
    showModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('show');
            document.body.classList.add('body-no-scroll'); 
        }
    }

    hideModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('show');
            document.body.classList.remove('body-no-scroll'); 
        }
    }

    bindDOMEvents() {
        // --- Modal Events ---
        document.getElementById('openAddBookModal').addEventListener('click', () => {
            document.getElementById('addBookForm').reset();
            this.clearErrorMessages('addBookForm');
            this.showModal('addBookModal');
        });
        
        this.bindModalCloseEvents('addBookModal');
        this.bindModalCloseEvents('editBookModal');

        // --- Form Submissions ---
        document.getElementById('addBookForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleAddBook();
        });
        
        document.getElementById('editBookForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleEditBookSubmit();
        });

        // --- Search and Filter ---
        document.getElementById('searchInput').addEventListener('input', (e) => {
            this.render(); 
        });

        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.currentFilter = btn.dataset.filter;
                this.render();
            });
        });

        // --- Other UI Events ---
        document.getElementById('scrollToTop').addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        document.getElementById('readingGoal').addEventListener('change', (e) => {
            this.readingGoal = parseInt(e.target.value) || 3;
            this.saveData();
            this.updateGoalProgress();
        });

        // --- Data Management ---
        document.getElementById('exportDataBtn').addEventListener('click', () => this.exportData());
        
        document.getElementById('importDataBtn').addEventListener('click', () => {
            document.getElementById('importFileInput').click();
        });
        
        document.getElementById('importFileInput').addEventListener('change', (e) => this.importData(e));
    }

    bindModalCloseEvents(modalId) {
        const modal = document.getElementById(modalId);
        modal.querySelector('.close-btn').addEventListener('click', () => this.hideModal(modalId));
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.hideModal(modalId);
            }
        });
    }

    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    saveData() {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.books));
        localStorage.setItem(this.STORAGE_KEY + '_goal', this.readingGoal);
    }

    loadData() {
        const storedBooks = localStorage.getItem(this.STORAGE_KEY);
        if (storedBooks) {
            this.books = JSON.parse(storedBooks);
        }
        const storedGoal = localStorage.getItem(this.STORAGE_KEY + '_goal');
        if (storedGoal) {
            this.readingGoal = parseInt(storedGoal);
            document.getElementById('readingGoal').value = this.readingGoal;
        }
    }

    validateForm(formId, fields) {
        let isValid = true;
        this.clearErrorMessages(formId);

        for (const field of fields) {
            const input = document.getElementById(field.id);
            const errorEl = document.getElementById(field.errorId);
            if (!input.value.trim()) {
                errorEl.textContent = `${field.name} tidak boleh kosong.`;
                isValid = false;
            } else if (field.type === 'number' && (isNaN(parseInt(input.value)) || parseInt(input.value) <= 0)) {
                errorEl.textContent = `${field.name} harus berupa angka positif.`;
                isValid = false;
            }
        }
        return isValid;
    }

    clearErrorMessages(formId) {
        document.querySelectorAll(`#${formId} .error-message`).forEach(el => el.textContent = '');
    }

    handleAddBook() {
        const fields = [
            { id: 'title', errorId: 'titleError', name: 'Judul' },
            { id: 'author', errorId: 'authorError', name: 'Penulis' },
            { id: 'totalPages', errorId: 'totalPagesError', name: 'Total Halaman', type: 'number' }
        ];
        if (!this.validateForm('addBookForm', fields)) {
            this.showNotification('⚠️ Harap perbaiki kesalahan pada formulir!', 'warning');
            return;
        }

        const newBook = {
            id: this.generateId(),
            title: document.getElementById('title').value.trim(),
            author: document.getElementById('author').value.trim(),
            category: document.getElementById('category').value,
            totalPages: parseInt(document.getElementById('totalPages').value),
            currentPage: 0,
            isComplete: false,
            dateAdded: new Date().toISOString(),
            dateCompleted: null
        };

        this.books.unshift(newBook);
        this.saveData();
        this.render();
        this.hideModal('addBookModal');
        this.showNotification(`📚 "${newBook.title}" berhasil ditambahkan!`, 'success');
    }

    updateProgress(bookId, newPage) {
        const book = this.books.find(b => b.id === bookId);
        if (!book) return;

        const pageNum = parseInt(newPage);
        if (isNaN(pageNum) || pageNum < 0 || pageNum > book.totalPages) {
            this.showNotification('⚠️ Halaman tidak valid!', 'warning');
            const input = document.querySelector(`#book-${bookId} .page-input`);
            if (input) input.value = book.currentPage;
            return;
        }

        book.currentPage = pageNum;
        if (pageNum === book.totalPages) {
            book.isComplete = true;
            book.dateCompleted = new Date().toISOString();
        } else {
            book.isComplete = false;
            book.dateCompleted = null;
        }
        this.saveData();
        this.updateBookCardDOM(book);
        this.updateStats();
        this.updateGoalProgress();
    }
    
    markComplete(bookId) {
        const book = this.books.find(b => b.id === bookId);
        if (!book || book.isComplete) return;

        book.isComplete = true;
        book.currentPage = book.totalPages;
        book.dateCompleted = new Date().toISOString();
        this.saveData();
        this.updateBookCardDOM(book);
        this.updateStats();
        this.updateGoalProgress();
        this.showNotification(`🎉 Selamat! "${book.title}" selesai dibaca!`, 'success');
    }

    deleteBook(bookId) {
        const bookIndex = this.books.findIndex(b => b.id === bookId);
        if (bookIndex === -1) return;

        const bookTitle = this.books[bookIndex].title;
        if (window.confirm(`Apakah Anda yakin ingin menghapus buku "${bookTitle}"?`)) {
            this.books.splice(bookIndex, 1);
            this.saveData();
            
            const bookElement = document.getElementById(`book-${bookId}`);
            if (bookElement) {
                bookElement.classList.add('removing');
                setTimeout(() => {
                    this.render();
                    this.showNotification(`🗑️ "${bookTitle}" telah dihapus.`, 'danger');
                }, 500);
            }
        }
    }
    
    openEditModal(bookId) {
        const book = this.books.find(b => b.id === bookId);
        if (!book) return;

        document.getElementById('editBookId').value = book.id;
        document.getElementById('editTitle').value = book.title;
        document.getElementById('editAuthor').value = book.author;
        document.getElementById('editCategory').value = book.category;
        document.getElementById('editTotalPages').value = book.totalPages;

        this.clearErrorMessages('editBookForm');
        this.showModal('editBookModal');
    }

    handleEditBookSubmit() {
        const fields = [
            { id: 'editTitle', errorId: 'editTitleError', name: 'Judul' },
            { id: 'editAuthor', errorId: 'editAuthorError', name: 'Penulis' },
            { id: 'editTotalPages', errorId: 'editTotalPagesError', name: 'Total Halaman', type: 'number' }
        ];
        if (!this.validateForm('editBookForm', fields)) {
            this.showNotification('⚠️ Harap perbaiki kesalahan pada formulir!', 'warning');
            return;
        }

        const bookId = document.getElementById('editBookId').value;
        const book = this.books.find(b => b.id === bookId);
        if (!book) return;

        book.title = document.getElementById('editTitle').value.trim();
        book.author = document.getElementById('editAuthor').value.trim();
        book.category = document.getElementById('editCategory').value;
        book.totalPages = parseInt(document.getElementById('editTotalPages').value);

        if (book.currentPage > book.totalPages) book.currentPage = book.totalPages;
        
        book.isComplete = (book.currentPage === book.totalPages);
        if(book.isComplete && !book.dateCompleted) {
            book.dateCompleted = new Date().toISOString();
        } else if (!book.isComplete) {
            book.dateCompleted = null;
        }

        this.saveData();
        this.updateBookCardDOM(book);
        this.updateStats();
        this.updateGoalProgress();
        this.hideModal('editBookModal');
        this.showNotification(`✏️ "${book.title}" berhasil diperbarui!`, 'success');
    }

    exportData() {
        if(this.books.length === 0){
            this.showNotification('Rak buku kosong, tidak ada data untuk diekspor.', 'warning');
            return;
        }
        const dataStr = JSON.stringify(this.books, null, 2);
        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'pustaka-digital-koleksi.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        this.showNotification('📥 Data berhasil diekspor!', 'success');
    }

    importData(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const importedBooks = JSON.parse(e.target.result);
                if (Array.isArray(importedBooks)) {
                    this.books = importedBooks;
                    this.saveData();
                    this.render();
                    this.showNotification('📤 Data berhasil diimpor!', 'success');
                } else {
                    throw new Error('Format tidak valid');
                }
            } catch (error) {
                this.showNotification('❌ Gagal mengimpor. Pastikan file JSON valid.', 'danger');
            }
        };
        reader.readAsText(file);
        event.target.value = '';
    }
    
    getFilteredBooks() {
        const searchQuery = document.getElementById('searchInput').value.toLowerCase();
        let filtered = this.books;
        
        if (this.currentFilter !== 'all') {
            switch(this.currentFilter) {
                case 'reading':
                    filtered = this.books.filter(book => !book.isComplete && book.currentPage > 0);
                    break;
                case 'completed':
                    filtered = this.books.filter(book => book.isComplete);
                    break;
                default:
                    filtered = this.books.filter(book => book.category === this.currentFilter);
            }
        }
        
        if (searchQuery) {
            filtered = filtered.filter(book => 
                book.title.toLowerCase().includes(searchQuery) ||
                book.author.toLowerCase().includes(searchQuery) ||
                book.category.toLowerCase().includes(searchQuery)
            );
        }
        
        return filtered;
    }

    render() {
        const bookGrid = document.getElementById('bookGrid');
        const emptyState = document.getElementById('emptyState');
        bookGrid.innerHTML = '';
        
        const booksToRender = this.getFilteredBooks();

        if (booksToRender.length === 0) {
            emptyState.style.display = 'block';
        } else {
            emptyState.style.display = 'none';
            booksToRender.forEach(book => {
                bookGrid.appendChild(this.createBookCardElement(book));
            });
        }
        
        this.updateStats();
        this.updateGoalProgress();
    }

    updateBookCardDOM(book) {
        const existingCard = document.getElementById(`book-${book.id}`);
        if (existingCard) {
            existingCard.replaceWith(this.createBookCardElement(book));
        }
    }

    createBookCardElement(book) {
        const progressPercent = book.totalPages > 0 ? (book.currentPage / book.totalPages) * 100 : 0;
        const bookCard = document.createElement('div');
        bookCard.className = 'book-card';
        bookCard.id = `book-${book.id}`;

        const actionsHTML = `
            ${!book.isComplete ? `
                <div class="update-form">
                    <input type="number" class="page-input" value="${book.currentPage}" min="0" max="${book.totalPages}" aria-label="Halaman saat ini">
                    <button type="button" class="btn btn-warning update-progress-btn">Update</button>
                </div>
                <button class="btn btn-success mark-complete-btn">Tandai Selesai</button>
            ` : ''}
            <button class="btn btn-secondary edit-btn">Edit</button>
            <button class="btn btn-danger delete-btn">Hapus</button>
        `;

        bookCard.innerHTML = `
            ${book.isComplete ? '<span class="completed-badge">Selesai</span>' : ''}
            <div class="book-header">
                <div class="book-icon">📖</div>
                <div class="book-info">
                    <h3>${book.title}</h3>
                    <p>oleh ${book.author}</p>
                </div>
            </div>
            <div class="book-meta">
                <span class="book-tag">${book.category}</span>
                <span class="book-tag">${book.totalPages} Halaman</span>
            </div>
            <div class="progress-section">
                <div class="progress-text">
                    <span>Progres: ${book.currentPage} / ${book.totalPages}</span>
                    <span>${progressPercent.toFixed(0)}%</span>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${progressPercent}%;"></div>
                </div>
            </div>
            <div class="book-actions">${actionsHTML}</div>
        `;

        // Add event listeners
        bookCard.querySelector('.delete-btn').addEventListener('click', () => this.deleteBook(book.id));
        bookCard.querySelector('.edit-btn').addEventListener('click', () => this.openEditModal(book.id));
        if (!book.isComplete) {
            const pageInput = bookCard.querySelector('.page-input');
            bookCard.querySelector('.update-progress-btn').addEventListener('click', () => this.updateProgress(book.id, pageInput.value));
            bookCard.querySelector('.mark-complete-btn').addEventListener('click', () => this.markComplete(book.id));
        }

        return bookCard;
    }

    updateStats() {
        document.getElementById('totalBooks').textContent = this.books.length;
        document.getElementById('completedBooks').textContent = this.books.filter(b => b.isComplete).length;
        document.getElementById('readingBooks').textContent = this.books.filter(b => !b.isComplete && b.currentPage > 0).length;
        document.getElementById('totalPagesRead').textContent = this.books.reduce((sum, book) => sum + book.currentPage, 0);
    }

    updateGoalProgress() {
        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();
        
        const completedThisMonth = this.books.filter(book => {
            if (book.isComplete && book.dateCompleted) {
                const completedDate = new Date(book.dateCompleted);
                return completedDate.getMonth() === currentMonth && completedDate.getFullYear() === currentYear;
            }
            return false;
        }).length;

        const monthlyProgressSpan = document.getElementById('monthlyProgress');
        const monthlyProgressBar = document.getElementById('monthlyProgressBar');
        monthlyProgressSpan.textContent = `${completedThisMonth}/${this.readingGoal}`;
        const progressPercentage = this.readingGoal > 0 ? (completedThisMonth / this.readingGoal) * 100 : 0;
        monthlyProgressBar.style.width = `${Math.min(progressPercentage, 100)}%`;
    }

    showNotification(message, type = 'success') {
        const notification = document.getElementById('notification');
        const notificationText = document.getElementById('notificationText');
        notificationText.textContent = message;
        notification.className = `notification show ${type}`;
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new PersonalLibrary();
});