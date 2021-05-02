let error = formValidate(item),
                    formData = new FormData(item);
                if(error === 0){
                    item.classList.add('feed-form_sending');
                    let response = await fetch('../sendmail.php',{
                        method: 'POST',
                        body: formData
                    });
                    if(response.ok){
                        let result = await response.json();
                        alert(result.message);
                        item.reset();
                        item.classList.remove('feed-form_sending');
                    }else{
                        alert("Ошибка!");
                        item.classList.remove('feed-form_sending');
                    }
                }else{
                   alert("Заполните все поля!");
                }