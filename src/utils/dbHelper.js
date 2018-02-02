import Mongoose from 'mongoose';

class DbUtils {
    public saveDocs(documents, isSquence = true) {
        if (isSquence) {

        }
    }
    private saveDocsSequence(docs) {
        saveNext(index) {

        }
        return new Promise((resolve, reject) => {
            const count = docs.length;
            let err = null;
            let saveNext = (index) => {
                if (!docs[index]) {
                    resolve(err);
                }
            };
            saveNext(0);

        });
    }
}

export {DbUtils as default};