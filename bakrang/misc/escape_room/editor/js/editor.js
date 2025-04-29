$(document).ready(function() {
    let jsonData = {};
    let currentElements = [];
    let imageWidth = 700;
    let imageHeight = 700;
    let selectedElement = null;
    let isDragging = false;
    let isResizing = false;

    // Load existing JSON data
    $.getJSON('data.json', function(data) {
        jsonData = data;
        currentElements = [...data.interactiveElements];
        imageWidth = data.imageSize.width;
        imageHeight = data.imageSize.height;
        
        // Populate form with existing data
        $('#backgroundImage').val(data.backgroundImage);
        $('#imageWidth').val(imageWidth);
        $('#imageHeight').val(imageHeight);
        
        // Load preview image
        const img = new Image();
        img.onload = function() {
            $('#previewImage').attr('src', data.backgroundImage);
            updatePreview();
        };
        img.src = data.backgroundImage;
        
        // Create element forms
        data.interactiveElements.forEach(createElementForm);
    });

    // Position mode toggle
    $('#dragMode').click(function() {
        $(this).addClass('active');
        $('#inputMode').removeClass('active');
        $('.position-inputs').hide();
        $('.preview-square').show();
    });

    $('#inputMode').click(function() {
        $(this).addClass('active');
        $('#dragMode').removeClass('active');
        $('.position-inputs').show();
        $('.preview-square').hide();
    });

    // Template for new element form
    function createElementForm(element, index) {
        const form = $(`
            <div class="element-form" data-index="${index}">
                <h4>Element ${index + 1}</h4>
                <div class="form-group">
                    <label>ID</label>
                    <input type="text" class="form-control element-id" value="${element.id}">
                </div>
                <div class="form-group">
                    <label>Title</label>
                    <input type="text" class="form-control element-title" value="${element.title}">
                </div>
                <div class="form-group position-inputs">
                    <label>Position</label>
                    <div class="position-inputs">
                        <input type="number" class="form-control position-top" placeholder="Top" value="${element.position.top}">
                        <input type="number" class="form-control position-left" placeholder="Left" value="${element.position.left}">
                        <input type="number" class="form-control position-width" placeholder="Width" value="${element.position.width}">
                        <input type="number" class="form-control position-height" placeholder="Height" value="${element.position.height}">
                    </div>
                </div>
                <div class="form-group">
                    <label>Question</label>
                    <input type="text" class="form-control element-question" value="${element.question}">
                </div>
                <div class="form-group">
                    <label>Answer</label>
                    <input type="text" class="form-control element-answer" value="${element.answer}">
                </div>
                <div class="form-group">
                    <label>Success Message</label>
                    <input type="text" class="form-control element-success-message" value="${element.successMessage}">
                </div>
                <div class="form-group">
                    <label>Failure Message</label>
                    <input type="text" class="form-control element-failure-message" value="${element.failureMessage}">
                </div>
                <div class="form-check">
                    <input type="checkbox" class="form-check-input element-final-puzzle" ${element.isFinalPuzzle ? 'checked' : ''}>
                    <label class="form-check-label">Is Final Puzzle</label>
                </div>
                <div class="form-group final-redirect" style="display: ${element.isFinalPuzzle ? 'block' : 'none'}">
                    <label>Success Redirect URL</label>
                    <input type="text" class="form-control element-redirect" value="${element.successRedirect || ''}">
                </div>
                <button type="button" class="btn btn-danger btn-sm remove-element">Remove</button>
            </div>
        `);

        form.find('.element-final-puzzle').change(function() {
            form.find('.final-redirect').toggle(this.checked);
        });

        form.find('.remove-element').click(function() {
            form.remove();
            updateElements();
            updatePreview();
        });

        $('#elementsContainer').append(form);
    }

    // Add new element button
    $('#addElement').click(function() {
        const newElement = {
            id: 'new-element-' + currentElements.length,
            title: 'New Element',
            position: { top: 0, left: 0, width: 100, height: 100 },
            question: '',
            answer: '',
            successMessage: '',
            failureMessage: '',
            isFinalPuzzle: false
        };
        currentElements.push(newElement);
        createElementForm(newElement, currentElements.length - 1);
        updatePreview();
    });

    // Update preview
    function updatePreview() {
        $('.preview-square').remove();
        const container = $('.preview-container');
        const containerWidth = container.width();
        const containerHeight = container.height();
        
        const scaleX = containerWidth / imageWidth;
        const scaleY = containerHeight / imageHeight;
        
        currentElements.forEach((element, index) => {
            const square = $('<div>')
                .addClass('preview-square')
                .attr('data-index', index)
                .css({
                    top: (element.position.top * scaleY) + 'px',
                    left: (element.position.left * scaleX) + 'px',
                    width: (element.position.width * scaleX) + 'px',
                    height: (element.position.height * scaleY) + 'px'
                })
                .append(
                    $('<div>').addClass('resize-handle nw'),
                    $('<div>').addClass('resize-handle ne'),
                    $('<div>').addClass('resize-handle sw'),
                    $('<div>').addClass('resize-handle se'),
                    $('<div>').addClass('resize-handle n'),
                    $('<div>').addClass('resize-handle s'),
                    $('<div>').addClass('resize-handle e'),
                    $('<div>').addClass('resize-handle w'),
                    $('<div>').addClass('size-info')
                );
            
            $('.preview-container').append(square);
        });

        // Initialize draggable and resizable
        $('.preview-square').draggable({
            containment: '.preview-container',
            start: function() {
                isDragging = true;
                $('.preview-square').removeClass('selected');
                $(this).addClass('selected');
                selectedElement = $(this);
            },
            stop: function() {
                isDragging = false;
                updatePositionFromPreview($(this));
            }
        }).resizable({
            handles: {
                'nw': '.resize-handle.nw',
                'ne': '.resize-handle.ne',
                'sw': '.resize-handle.sw',
                'se': '.resize-handle.se',
                'n': '.resize-handle.n',
                's': '.resize-handle.s',
                'e': '.resize-handle.e',
                'w': '.resize-handle.w'
            },
            containment: '.preview-container',
            start: function() {
                isResizing = true;
                $('.preview-square').removeClass('selected');
                $(this).addClass('selected resizing');
                selectedElement = $(this);
            },
            stop: function() {
                isResizing = false;
                $(this).removeClass('resizing');
                updatePositionFromPreview($(this));
            },
            resize: function(event, ui) {
                const container = $('.preview-container');
                const containerWidth = container.width();
                const containerHeight = container.height();
                
                const scaleX = imageWidth / containerWidth;
                const scaleY = imageHeight / containerHeight;
                
                const width = Math.round(ui.size.width * scaleX);
                const height = Math.round(ui.size.height * scaleY);
                
                $(this).find('.size-info').text(`${width} x ${height}`);
            }
        });

        // Update size info on initial load
        $('.preview-square').each(function() {
            const container = $('.preview-container');
            const containerWidth = container.width();
            const containerHeight = container.height();
            
            const scaleX = imageWidth / containerWidth;
            const scaleY = imageHeight / containerHeight;
            
            const width = Math.round($(this).width() * scaleX);
            const height = Math.round($(this).height() * scaleY);
            
            $(this).find('.size-info').text(`${width} x ${height}`);
        });
    }

    function updatePositionFromPreview(square) {
        const container = $('.preview-container');
        const containerWidth = container.width();
        const containerHeight = container.height();
        
        const scaleX = imageWidth / containerWidth;
        const scaleY = imageHeight / containerHeight;
        
        const index = square.data('index');
        const form = $('.element-form').eq(index);
        
        const position = {
            top: Math.round(square.position().top * scaleY),
            left: Math.round(square.position().left * scaleX),
            width: Math.round(square.width() * scaleX),
            height: Math.round(square.height() * scaleY)
        };
        
        form.find('.position-top').val(position.top);
        form.find('.position-left').val(position.left);
        form.find('.position-width').val(position.width);
        form.find('.position-height').val(position.height);
        
        updateElements();
    }

    // Update elements array
    function updateElements() {
        currentElements = [];
        $('.element-form').each(function() {
            const form = $(this);
            currentElements.push({
                id: form.find('.element-id').val(),
                title: form.find('.element-title').val(),
                position: {
                    top: parseInt(form.find('.position-top').val()),
                    left: parseInt(form.find('.position-left').val()),
                    width: parseInt(form.find('.position-width').val()),
                    height: parseInt(form.find('.position-height').val())
                },
                question: form.find('.element-question').val(),
                answer: form.find('.element-answer').val(),
                successMessage: form.find('.element-success-message').val(),
                failureMessage: form.find('.element-failure-message').val(),
                isFinalPuzzle: form.find('.element-final-puzzle').is(':checked'),
                successRedirect: form.find('.element-redirect').val()
            });
        });
    }

    // Save JSON
    $('#saveJson').click(function() {
        updateElements();
        
        const jsonToSave = {
            backgroundImage: $('#backgroundImage').val(),
            imageSize: {
                width: parseInt($('#imageWidth').val()),
                height: parseInt($('#imageHeight').val())
            },
            interactiveElements: currentElements
        };

        // Create a blob and download the file
        const blob = new Blob([JSON.stringify(jsonToSave, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'data.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    });

    // Update preview when position changes or window resizes
    $(document).on('change', '.position-inputs input', function() {
        updateElements();
        updatePreview();
    });

    $(window).resize(function() {
        updatePreview();
    });

    // Initialize in drag mode
    $('#dragMode').click();
}); 