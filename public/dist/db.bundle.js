!function(){var e="notes";"indexedDB"in window&&console.log("browser support indexedDb"),idb.open("awesome-pwa-note-db",1,(function(o){o.objectStoreNames.contains(e)||o.createObjectStore(e,{keyPath:"id"})}))}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGIuYnVuZGxlLmpzIiwibWFwcGluZ3MiOiJDQUFVLFdBRU4sSUFDTUEsRUFBVyxRQUViLGNBQWVDLFFBQ2ZDLFFBQVFDLElBQUksNkJBSUFDLElBQUlDLEtBUk4sc0JBUW1CLEdBQUUsU0FBVUMsR0FDckNBLEVBQVNDLGlCQUFpQkMsU0FBU1IsSUFDbkNNLEVBQVNHLGtCQUFrQlQsRUFBVyxDQUFDVSxRQUFRLE1BRXZELEdBa0RKLENBaEVVIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdGVzdC1wd2Etd2VicGFjay8uL3NyYy9qcy9kYi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBkYj0oZnVuY3Rpb24gKCkge1xyXG4gICAgLy90aGlzIGlzIG5hbWUgb2YgZGF0YWJhc2UgaW4gaW5kZXhlZERCXHJcbiAgICBjb25zdCBEQl9OQU1FPVwiYXdlc29tZS1wd2Etbm90ZS1kYlwiO1xyXG4gICAgY29uc3QgVEFCTEVfTkFNRT1cIm5vdGVzXCI7XHJcbiAgICAvLy9jaGVjayBpZiBicm93c2VyIHN1cHBvcnQgaW5kZXhlZERCXHJcbiAgICBpZiAoXCJpbmRleGVkREJcIiBpbiB3aW5kb3cpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImJyb3dzZXIgc3VwcG9ydCBpbmRleGVkRGJcIik7XHJcbiAgICB9XHJcbiAgICAvLy9jcmVhdGUgYW5kIG9wZW4gYSBkYXRhYmFzZSBuYW1lZCBEQl9OQU1FOyBcclxuICAgIC8vLyB0aGVuIGlmIGRhdGFiYXNlIGRvZXNuJ3QgY29udGFpbiBhbnkgdGFibGUgbmFtZWQgVEFCTEVfTkFNRSBjcmVhdGUgb25lIGluIGRhdGFiYXNlIGFuZCBwdXQga2V5UGF0aD1pZFxyXG4gICAgY29uc3QgZGJQcm9taXNlPWlkYi5vcGVuKERCX05BTUUsMSxmdW5jdGlvbiAoZGF0YWJhc2UpIHtcclxuICAgICAgICBpZighZGF0YWJhc2Uub2JqZWN0U3RvcmVOYW1lcy5jb250YWlucyhUQUJMRV9OQU1FKSl7XHJcbiAgICAgICAgICAgIGRhdGFiYXNlLmNyZWF0ZU9iamVjdFN0b3JlKFRBQkxFX05BTUUse2tleVBhdGg6XCJpZFwifSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICAvLy93cml0ZSBhbmQgcHV0IGRhdGEgaW4gVEFCTEVfTkFNRVxyXG4gICAgY29uc3Qgd3JpdGVOb3Rlcz1mdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgIHJldHVybiBkYlByb21pc2UudGhlbihmdW5jdGlvbiAoZGF0YWJhc2UpIHtcclxuICAgICAgICAgICAgdmFyIHR4PWRhdGFiYXNlXHJcbiAgICAgICAgICAgIC50cmFuc2FjdGlvbihUQUJMRV9OQU1FLFwicmVhZHdyaXRlXCIpXHJcbiAgICAgICAgICAgIC5vYmplY3RTdG9yZShUQUJMRV9OQU1FKVxyXG4gICAgICAgICAgICAucHV0KGRhdGEpO1xyXG4gICAgICAgICAgICByZXR1cm4gdHguY29tcGxldGU7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICAvLy8vZ2V0IG5vdGVcclxuICAgIGNvbnN0IGdldE5vdGU9ZnVuY3Rpb24gKGlkKSB7XHJcbiAgICAgICAgcmV0dXJuIGRiUHJvbWlzZS50aGVuKGZ1bmN0aW9uIChkYXRhYmFzZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZGF0YWJhc2UudHJhbnNhY3Rpb24oVEFCTEVfTkFNRSxcInJlYWR3cml0ZVwiKVxyXG4gICAgICAgICAgICAub2JqZWN0U3RvcmUoVEFCTEVfTkFNRSkuZ2V0KGlkKTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG4gICAgLy8vZGVsZXRlIG5vdGVcclxuICAgIGNvbnN0IGRlbGV0ZU5vdGU9ZnVuY3Rpb24gKGlkKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJkZWxldGluZy4uLi4uLi4uLi4uXCIpO1xyXG4gICAgICAgIHJldHVybiBkYlByb21pc2UudGhlbihmdW5jdGlvbiAoZGF0YWJhc2UpIHtcclxuICAgICAgICAgICAgY29uc3QgdHg9ZGF0YWJhc2UudHJhbnNhY3Rpb24oVEFCTEVfTkFNRSxcInJlYWR3cml0ZVwiKVxyXG4gICAgICAgICAgICAub2JqZWN0U3RvcmUoVEFCTEVfTkFNRSkuZGVsZXRlKGlkKTtcclxuICAgICAgICAgICAgcmV0dXJuIHR4LmNvbXBsZXRlO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcbiAgICAvLy9nZXQgYWxsIG5vdGVzIGp1c3Qgbm90aWNlIHlvdSBzaG91bGQgZGV0ZXJtaW5lIGFjY2Vzc2JpbGl0eSByZWFkb25seVxyXG4gICAgY29uc3QgcmVhZEFsbE5vdGVzPWZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gZGJQcm9taXNlLnRoZW4oZnVuY3Rpb24gKGRhdGFiYXNlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBkYXRhYmFzZS50cmFuc2FjdGlvbihUQUJMRV9OQU1FLCdyZWFkb25seScpXHJcbiAgICAgICAgICAgIC5vYmplY3RTdG9yZShUQUJMRV9OQU1FKS5nZXRBbGwoKTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG4gICAgLy8vY2xlYXIgYWxsIG5vdGVzXHJcbiAgICBjb25zdCBjbGVhckFsbE5vdGVzPWZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gZGJQcm9taXNlLnRoZW4oZnVuY3Rpb24gKGRhdGFiYXNlKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHR4PSBkYXRhYmFzZS50cmFuc2FjdGlvbihUQUJMRV9OQU1FLFwicmVhZG9ubHlcIilcclxuICAgICAgICAgICAgLm9iamVjdFN0b3JlKFRBQkxFX05BTUUpLmNsZWFyKCk7XHJcbiAgICAgICAgICAgIHJldHVybiB0eC5jb21wbGV0ZTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG4gICAgLy8vIGRiIHJldHVybiB0aGVzZSBtZXRob2RzXHJcbiAgICByZXR1cm57XHJcbiAgICAgICAgd3JpdGVOb3RlcyxcclxuICAgICAgICBnZXROb3RlLFxyXG4gICAgICAgIHJlYWRBbGxOb3RlcyxcclxuICAgICAgICBkZWxldGVOb3RlLFxyXG4gICAgICAgIGNsZWFyQWxsTm90ZXNcclxuICAgIH1cclxufSkoKSJdLCJuYW1lcyI6WyJUQUJMRV9OQU1FIiwid2luZG93IiwiY29uc29sZSIsImxvZyIsImlkYiIsIm9wZW4iLCJkYXRhYmFzZSIsIm9iamVjdFN0b3JlTmFtZXMiLCJjb250YWlucyIsImNyZWF0ZU9iamVjdFN0b3JlIiwia2V5UGF0aCJdLCJzb3VyY2VSb290IjoiIn0=